const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const sqlite3 = require("sqlite3").verbose();
const webpush = require("web-push");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const ejs = require("ejs")
const fs = require('fs');
const multer = require('multer');



// ************* MODULES INCLUDE BEGIN **************
const { getCurrentDate, getCurrentTime } = require('./Modules/TimeFunction');




// *************** USE-SET CODE INIT ***************
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs')




// ************ MIDDLEWARE INCLUDE BEGIN **********
const sessionMiddleware = require("./Middlewares/sessionMiddleware")
app.use(sessionMiddleware);
const { csrfProtection } = require("./Middlewares/csrfMiddleware")

const db = new sqlite3.Database("mesajlar.db");


let parseForm = bodyParser.urlencoded({ extended: false });



// *************** IMPORTANT - REQUEST COOKIE IN SESSION *******************************
io.use((socket, next) => {
    const cookie = socket.handshake.headers.cookie;
    const sessionId = cookie.split(';').find(c => c.trim().startsWith('connect.sid='));

    if (sessionId) {
        const id = sessionId.split('=')[1];
        socket.request.headers.cookie = `connect.sid=${id}`;
        sessionMiddleware(socket.request, {}, next);
    } else {

        return next(new Error('Session ID not found'));
    }
});


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


app.post("/sendInput", upload.single('fileInput'), (req, res) => {

    if (req.session.username) {


        const file = req.file;
        console.log(file)

        const message = req.body.messageInput;
        let currentUsername = req.session.username

        // Fotoğraf içermiyorsa =>
        if (req.file == undefined && req.body.messageInput != "") {
            db.run(
                "INSERT INTO umut_silan (username, message, date, time, ip) VALUES (?, ?, ?, ?, ?)",

                [currentUsername, message, getCurrentDate(), getCurrentTime(), req.ip],
                function (err) {
                    if (err) {
                        return console.log(err.message);
                    }

                    io.emit("message", { id: this.lastID, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate() });
                }
            );


            db.all('SELECT subDatabase FROM bildirimlertablosu', [], (err, rows) => {
                if (err) {
                    throw err;
                }

                const subDatabaseArray = rows.map(row => row.subDatabase);

                subDatabaseArray.forEach(subDatabaseValue => {
                    try {
                        webpush.sendNotification(JSON.parse(subDatabaseValue), message);
                    } catch (error) {
                        // Hata durumlarını işleyin
                        console.error('Bildirim gönderme hatası:', error);
                        // Aboneliği veritabanından silmeyi veya işaretleme gibi işlemleri burada gerçekleştirebilirsiniz.
                    }
                });
            });
        }




        // Sadece fotoğraf varsa =>
        else if (req.file != undefined && req.body.messageInput == "") {
            console.log(path.basename(req.file.path))
            db.run(
                "INSERT INTO umut_silan (username, message, date, time, ip, photoPath) VALUES (?, ?, ?, ?, ?, ?)",
                [currentUsername, message, getCurrentDate(), getCurrentTime(), req.ip, `https://umutsar.net/UsersPhotos/${path.basename(req.file.path)}`],
                function (err) {
                    if (err) {
                        return console.log(err.message);
                    }

                    io.emit("message", { id: this.lastID, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), photoPath: `https://umutsar.net/UsersPhotos/${path.basename(req.file.path)}` });
                }
            );


            db.all('SELECT subDatabase FROM bildirimlertablosu', [], (err, rows) => {
                if (err) {
                    throw err;
                }
                const subDatabaseArray = rows.map(row => row.subDatabase);
                subDatabaseArray.forEach(subDatabaseValue => {
                    webpush.sendNotification(JSON.parse(subDatabaseValue), "[Fotoğraf]");
                });
            });
        }



        // Her İkisi de Varsa =>
        else if (req.file != undefined && req.body.messageInput != "") {
            console.log(path.basename(req.file.path))
            db.run(
                "INSERT INTO umut_silan (username, message, date, time, ip, photoPath) VALUES (?, ?, ?, ?, ?, ?)",
                [currentUsername, message, getCurrentDate(), getCurrentTime(), req.ip, `https://umutsar.net/UsersPhotos/${path.basename(req.file.path)}`],
                function (err) {
                    if (err) {
                        return console.log(err.message);
                    }

                    io.emit("message", { id: this.lastID, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate(), photoPath: `https://umutsar.net/UsersPhotos/${path.basename(req.file.path)}` });
                }
            );


            db.all('SELECT subDatabase FROM bildirimlertablosu', [], (err, rows) => {
                if (err) {
                    throw err;
                }
                const subDatabaseArray = rows.map(row => row.subDatabase);
                subDatabaseArray.forEach(subDatabaseValue => {
                    webpush.sendNotification(JSON.parse(subDatabaseValue), "[Fotoğraf] " + message);
                });
            });
        }

        res.sendStatus(200)
    }

    // else if(req.session.username == undefined) {
    //     console.log(req.session.username)
    //     res.redirect("/login")
    // }
})



app.post('/login', parseForm, csrfProtection, (req, res) => {
    const { username, password } = req.body;


    db.get('SELECT * FROM kullanicilar WHERE kullaniciadi = ? AND sifre = ?', [username, password], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (row) {
            if (row['isActive'] == 1) {
                req.session.username = String(username);
                res.redirect('/chat.html');
            }

            else {
                res.render('login', { csrfToken: req.csrfToken(), notActive: 1 });
            }


        } else {
            res.render('login', { csrfToken: req.csrfToken(), notActive: 2 });
        }
    });
});




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


io.on("connection", (socket) => {

    socket.on("sendMessage", (data) => {
        const message = data.trim();

        for (let i = 0; i < subDatabase.length; i++) {
            webpush.sendNotification(subDatabase[i], message);
            console.log(`${i}. verimiz: `, subDatabase[i])
        }

        if (data.trim() == "/deleteall") {
            db.run("DELETE FROM umut_silan;");
            io.emit("deleteAllMessages");
        }

        else {
            db.run(
                "INSERT INTO umut_silan (username, message, date, time) VALUES (?, ?, ?, ?)",

                [currentUsername, message, getCurrentDate(), getCurrentTime()],
                function (err) {
                    if (err) {
                        return console.log(err.message);
                    } 

                    io.emit("message", { id: this.lastID, username: currentUsername, message: message, time: getCurrentTime(), date: getCurrentDate() });
                }
            );

        }
    });

    socket.on("getInitialMessages", () => {
        console.log("socket id", socket.id)


        // Veritabanı satır kontrolü yeri:

        let rowCount;
        db.get(`SELECT COUNT(*) as count FROM umut_silan`, (err, result) => {
            if (err) {
                console.error(err.message);
            }

            else {
                rowCount = result.count;
            }
        });


        // if(rowCount < )


        db.all(`SELECT * FROM umut_silan WHERE isDeleted = 0 ORDER BY id DESC LIMIT ${20} OFFSET ${0}`, (err, rows) => {
            if (err) {
            } else {
                socket.emit("initialMessages", { mesajlar: rows.reverse(), currentDate: getCurrentDate(), rowCountKey: rowCount });
            }
        });

    });

    async function fetchRowCount() {
        return new Promise((resolve, reject) => {
            db.get(`SELECT COUNT(*) as count FROM umut_silan WHERE isDeleted = 0;`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.count);
                }
            });
        });
    }

    socket.on("yirmiMesajVer", async (queue) => {
        console.log(queue);

        try {
            let rowCount = await fetchRowCount();
            console.log("socket id", socket.id);

            let sqlQuery = `SELECT * FROM umut_silan WHERE isDeleted = 0 ORDER BY id DESC`;
            // console.log(`rowCount: ${rowCount}, queue: ${queue}`);



            if (rowCount >= queue + 20) {
                console.log("rowCount greater than queue");
                sqlQuery += ` LIMIT 20 OFFSET ${queue}`;

                db.all(sqlQuery, (err, rows) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        socket.emit("yirmiMesajiAl", { mesajlar: rows, currentDate: getCurrentDate(), rowCountKey: rowCount });
                    }
                });
            }

            else {
                if (queue < rowCount) {
                    console.log("Coming the last ones...");
                    sqlQuery += ` LIMIT ${rowCount - queue} OFFSET ${queue}`;
                    db.all(sqlQuery, (err, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            socket.emit("yirmiMesajiAl", { mesajlar: rows, currentDate: getCurrentDate(), rowCountKey: rowCount }); 
                        }
                    });
                }
            }

        } catch (error) {
            console.error(error.message);
        }
    });



    socket.on("deleteMessage", (messageId) => {

        db.run("UPDATE umut_silan SET isDeleted = 1 WHERE id = ?", [messageId], function (err) {
            if (err) {
                return console.error(err.message);
            }
            io.emit("deleteMessageBroadcast", messageId);
        });
    })
});

// ************* ROUTE INCLUDE BEGIN **************
const logout = require("./routes/logoutRoute");
const origin = require("./routes/originRoute")
const loginGet = require("./routes/loginGetRoute")

// ************* ROUTE USE BEGIN **************
app.use(logout);
app.use(origin);
app.use(loginGet)

app.use(express.static(__dirname + "/public"));

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 443;

server.listen(PORT, HOST, () => {
    console.log(
        `Sunucu ${PORT} numaralı portta ve ${HOST} IP adresinde başlatıldı.`
    );
});