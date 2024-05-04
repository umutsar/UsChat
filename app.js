const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { db } = require("./Controller/databaseConnection")
const webpush = require("web-push");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const multer = require('multer');


// ************* MODULES INCLUDE BEGIN **************
const { getCurrentDate, getCurrentTime } = require('./Modules/TimeFunction');

// *************** USE-SET CODE INIT ***************
const { app, server, io } = require("./Controller/socketServer");
const deleteMessageController = require("./Controller/deleteMessageController")
const initialMessage = require("./Controller/initialMessage")
const initialChat = require("./Controller/initialChat")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs')
let notificationSwitch = false;

// ************ MIDDLEWARE INCLUDE BEGIN **********
const sessionMiddleware = require("./Middlewares/sessionMiddleware")
app.use(sessionMiddleware);

// *************** IMPORTANT - REQUEST COOKIE IN SESSION *******************************


const uploadDir = path.join(__dirname, '/public/UsersPhotos');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/*
app.get('/abc', (req, res) => {
    const userAgent = req.headers['user-agent'];
    let os = 'Unknown';

    if (/Windows/.test(userAgent)) {
        os = 'Windows';
    } else if (/Linux/.test(userAgent)) {
        os = 'Linux';
    } else if (/Mac/.test(userAgent)) {
        os = 'Mac';
    }

    res.send(`You are using ${os} operating system.`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
*/


app.post("/sendInput", upload.single('fileInput'), (req, res) => {
    //const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (req.session.username) {

        const file = req.file;
        const message = req.body.messageInput;
        let currentUsername = req.session.username

        let lastCount = 0;
        let toPerson = 'none';

        // Promise ile sorgu işlemi gerçekleştirme
        const getMaxCount = () => {
            return new Promise((resolve, reject) => {
                db.get(`SELECT * FROM (SELECT * FROM ${req.session.username}_${req.body.toPerson} UNION SELECT * FROM ${req.body.toPerson}_${req.session.username}) AS combined_table ORDER BY count DESC LIMIT 1`, (err, row) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        if (row) {
                            resolve(row.count);
                        }
                        else {
                            resolve(0);
                        }
                    }
                });
            });
        };

        const getToPersonSessionId = () => {
            return new Promise((resolve, reject) => {
                db.get("SELECT sessionId FROM kullanicilar WHERE kullaniciadi = ?;", [req.body.toPerson], function (err, row) {
                    if (err) {
                        reject(err.message)
                    }

                    toPerson = row.sessionId;
                    resolve(toPerson)
                })
            })
        }


        // Fotoğraf içermiyorsa =>
        if (req.file == undefined && req.body.messageInput != "") {


            getMaxCount().then((maxCount) => {
                lastCount = maxCount;

                getToPersonSessionId().then((result) => {

                    db.run(
                        `INSERT INTO ${req.session.username}_${req.body.toPerson} (username, message, date, time, ip, count) VALUES (?, ?, ?, ?, ?, ?)`,
                        [currentUsername, message, getCurrentDate(), getCurrentTime(), ip, lastCount + 1],
                        function (err) {
                            if (err) {
                                return console.log(err.message);
                            }

                            db.get("SELECT sessionId FROM kullanicilar WHERE kullaniciadi = ?;", [req.session.username], function (err, row) {
                                io.to(result).emit("message", { count: lastCount + 1, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), myMessage: false });
                                if (result != row.sessionId) {
                                    io.to(row.sessionId).emit("message", { count: lastCount + 1, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), myMessage: true });
                                }
                            })
                        }
                    );

                })

            }).catch((error) => {
                console.error("Hata oluştu:", error);
            });

            if (notificationSwitch) {
                let pushInformations = {
                    kullanici: `${currentUsername}`,
                    mesaj: message + ` [${getCurrentTime()}]`
                }


                db.get('SELECT subDatabase FROM bildirimlertablosu WHERE user = ?', [req.body.toPerson], (err, row) => {
                    if (err) {
                        throw err;
                    }
                    if (row) {
                        const subDatabase = row.subDatabase;

                        try {
                            if (subDatabase != "" || subDatabase != undefined || subDatabase != null) {
                                webpush.sendNotification(JSON.parse(subDatabase), JSON.stringify(pushInformations));
                            }

                        } catch (error) {
                            // Hata durumlarını işleyin
                            console.error('Bildirim gönderme hatası:', error);
                            // Aboneliği veritabanından silmeyi veya işaretleme gibi işlemleri burada gerçekleştirebilirsiniz.
                        }
                    }


                });
            }
        }


        else if (req.file != undefined && req.body.messageInput == "") {

            getMaxCount().then((maxCount) => {

                db.run(
                    `INSERT INTO ${req.session.username}_${req.body.toPerson} (username, message, date, time, ip, photoPath, count) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [currentUsername, message, getCurrentDate(), getCurrentTime(), ip, `http://localhost:543/UsersPhotos/${path.basename(req.file.path)}`, maxCount + 1],
                    function (err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        getToPersonSessionId().then((result) => {

                            db.get("SELECT sessionId FROM kullanicilar WHERE kullaniciadi = ?;", [req.session.username], function (err, row) {

                                io.to(result).emit("message",
                                    { count: lastCount + 1, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), photoPath: `http://localhost:543/UsersPhotos/${path.basename(req.file.path)}`, myMessage: false });


                                if (result != row.sessionId) {

                                    io.to(row.sessionId).emit("message",
                                        { count: lastCount + 1, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), photoPath: `http://localhost:543/UsersPhotos/${path.basename(req.file.path)}`, myMessage: true });

                                }
                            })
                        })
                    }
                );

            })

            if (notificationSwitch) {

                db.all('SELECT subDatabase FROM bildirimlertablosu WHERE user = ?', [req.body.toPerson], (err, row) => {
                    if (err) {
                        throw err;
                    }


                    let pushInformations = {
                        kullanici: `${currentUsername}`,
                        mesaj: message + `${currentUsername}: ` + "[Fotoğraf]" + ` [${getCurrentTime()}]`
                    }

                    if (row) {

                        try {
                            if (row[0].subDatabase != "" || row[0].subDatabase != undefined || row[0].subDatabase != null) {
                                webpush.sendNotification(JSON.parse(row[0].subDatabase), JSON.stringify(pushInformations));
                            }

                        } catch (error) {
                            console.error('Bildirim gönderme hatası:', error);
                        }
                    }
                });
            }
        }


        // Her İkisi de Varsa =>
        else if (req.file != undefined && req.body.messageInput != "") {

            getMaxCount().then((maxCount) => {
                db.run(
                    `INSERT INTO ${req.session.username}_${req.body.toPerson} (username, message, date, time, ip, photoPath, count) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [currentUsername, message, getCurrentDate(), getCurrentTime(), ip, `http://localhost:543/UsersPhotos/${path.basename(req.file.path)}`, maxCount + 1],
                    function (err) {
                        if (err) {
                            return console.log(err.message);
                        }

                        getToPersonSessionId().then((result) => {

                            db.get("SELECT sessionId FROM kullanicilar WHERE kullaniciadi = ?;", [req.session.username], function (err, row) {
                                io.to(result).emit("message", { count: lastCount + 1, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), photoPath: `http://localhost:543/UsersPhotos/${path.basename(req.file.path)}` });
                                if (result != row.sessionId) {
                                    io.to(row.sessionId).emit("message", { count: lastCount + 1, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), photoPath: `http://localhost:543/UsersPhotos/${path.basename(req.file.path)}` });
                                }
                            })
                        })
                    }
                );
            })



            if (notificationSwitch) {
                db.all('SELECT subDatabase FROM bildirimlertablosu WHERE user = ?', [req.body.toPerson], (err, row) => {
                    if (err) {
                        throw err;
                    }

                    if (row) {

                        if (row[0].subDatabase != "" || row[0].subDatabase != undefined || row[0].subDatabase != null || row[0].subDatabase != null) {
                            webpush.sendNotification(JSON.parse(row[0].subDatabase), `${currentUsername}: ` + "[Fotoğraf] " + message + ` [${getCurrentTime()}]`);
                        }
                    }

                });
            }
        }

        res.sendStatus(200)
    }

    // else if(req.session.username == undefined) {
    //     console.log(req.session.username)
    //     res.redirect("/login")
    // }
})



// Chat route
app.get('/chat.html', (req, res) => {

    // Check if user is logged in
    if (!(req.session && req.session.username)) {
        res.redirect('/login');
    }
    else {
        res.sendFile(__dirname + '/public/chat.html');
    }
});


const apiKeys = {
    publicKey: "BGEV18c5qUAPa51di_CyCgLF9SU9wRoGjKQg-iHSHhNWRNUfmVFDcljla79vwmp4L60YivZdJojVCaLNzCVLLS4",
    privateKey: "Y5E2geQTRl_Q9nUgofqZjjecPHRI1uC2bkMgXGYCm-o",
}


webpush.setVapidDetails(
    'mailto:u05398552445@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

const subDatabase = [];


app.post("/save-subscription", (req, res) => {
    const newSubscription = req.body;
    const username = req.session.username;

    // Kullanıcının bir oturumu var mı kontrol et
    if (!username) {
        return res.json({ status: "Error", message: "User not authenticated!" });
    }

    // Kullanıcının bildirim verilerini veritabanından kontrol et
    db.get("SELECT * FROM bildirimlertablosu WHERE user = ?", [username], (err, row) => {
        if (err) {
            return res.json({ status: "Error", message: "Database error!" });
        }

        // Kullanıcının verisi zaten varsa güncelle
        if (row) {
            db.run(
                "UPDATE bildirimlertablosu SET subDatabase = ? WHERE user = ?",
                [JSON.stringify(newSubscription), username],
                function (updateErr) {
                    if (updateErr) {
                        return res.json({ status: "Error", message: "Update error!" });
                    }

                    res.json({ status: "Success", message: "Subscription updated!" });
                }
            );

        } else {
            // Kullanıcının verisi yoksa ekle
            db.run(
                "INSERT INTO bildirimlertablosu (user, subDatabase) VALUES (?, ?)",
                [username, JSON.stringify(newSubscription)],
                function (insertErr) {
                    if (insertErr) {
                        return res.json({ status: "Error", message: "Insert error!" });
                    }

                    res.json({ status: "Success", message: "Subscription saved!" });
                }
            );
        }
    });
});


deleteMessageController();
initialMessage();
initialChat();

io.on("connection", (socket) => {

    socket.on("debug", (num) => {
        console.log(num)
    })
});

// ************* ROUTE INCLUDE BEGIN **************
const logout = require("./routes/logoutRoute");
const origin = require("./routes/originRoute")
const loginGet = require("./routes/loginGetRoute")
const loginPost = require("./routes/loginPostRoute")
const signupRoute = require("./routes/signupRoute");
const activationRoute = require("./routes/activationRoute");
// const { resourceLimits } = require("worker_threads");

// ************* ROUTE USE BEGIN **************
app.use(logout);
app.use(origin);
app.use(loginGet);
app.use(loginPost);
app.use(activationRoute);
app.use(signupRoute);

app.use(express.static(__dirname + "/public"));

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 543;

server.listen(PORT, HOST, () => {
    console.log(
        `Sunucu ${PORT} numaralı portta ve ${HOST} IP adresinde başlatıldı.`
    );
});