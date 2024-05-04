const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const sqlite3 = require("sqlite3").verbose();
const webpush = require("web-push");
const cors = require('cors');
const uuidv4 = require("uuid").v4;


const app = express();

app.use(cors());

app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);


const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
});

app.use(sessionMiddleware);


io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});



const db = new sqlite3.Database("mesajlar.db");



const apiKeys = {
    publicKey: "BOhk-iiVaF1r1sWRZbwHQhGKVKoAEuWV9FMwVs61GK7ExCdJZSqNfH4826hfi8YHAYfaqhpChRfc2bE666Nri9s",
    privateKey: "4RbnwqP3vDdvBrkXnk_u-l_8RX9oFh4w6I1VBiNIy0g",
}

webpush.setVapidDetails(
    'mailto:u05398552445@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

const subDatabase = [];

const sessions = {};

app.post("/save-subscription", (req, res) => {
    subDatabase.push(req.body);
    console.log("Orijinal bildirim bilgisi: ", req.body);

    db.run(
        "INSERT INTO bildirimlertablosu (subDatabase) VALUES (?)",
        [JSON.stringify(req.body)],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`subDatabase veritabanına eklendi. `);
        }
    );


    res.json({ status: "Success", message: "Subscription saved!" })
    console.log("Server: Save subs edildi.")
})



// const sessions = {}

// app.post("/login", (req, res) => {
//     const { userName, passWord } = req.body;
//     if (userName !== 'admin' || password !== 'pass') {
//         return res.status(401).send('Invalid username or password!!!')
//     }

//     const sessionId = uuidv4();
//     sessions[sessionId] = { userName, userId: 1 };
//     res.set('Set-Cookie', `session=${sessionId}`)
//     res.send('success');
// })



currentUsername = "guest";
currentname = "guest";


// ******************* TARIH VE SAAT BILGISINI AL BEGIN****************
function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
}
// ******************* TARIH VE SAAT BILGISINI AL END ****************


io.on("connection", (socket) => {

    const SESSION_RELOAD_INTERVAL = 30 * 1000;
    const timer = setInterval(() => {
        socket.request.session.reload((err) => {
            if (err) {
                // forces the client to reconnect
                socket.conn.close();
                // you can also use socket.disconnect(), but in that case the client
                // will not try to reconnect
            }

            else {

            }
        });
    }, SESSION_RELOAD_INTERVAL);
    console.log(socket.request.session)
    // console.log(`${currentname} kullanıcısı bağlandı.`);
    socket.on("login", (data) => {
        const { username, password } = data;
        // Kullanıcıyı veritabanında kontrol et
        db.get(
            "SELECT * FROM kullanicilar WHERE kullaniciadi = ? AND sifre = ?",
            [username.trim(), password.trim()],
            (err, row) => {
                if (err) {
                    console.error(err.message);
                    socket.emit("loginResponse", { success: false });
                }
                else {
                    if (row && row.isActive == 1) {
                        console.log(row.isActive)
                        currentUsername = username;
                        socket.emit("loginResponse", { success: true });
                    }

                    else if (row && row.isActive == 0) {
                        socket.emit("loginResponse", { success: "notActive" });
                    }
                    else {
                        socket.emit("loginResponse", { success: false });
                    }
                }
            }
        );
    });

    socket.on("sendMessage", (data) => {
        const message = data.trim();

        // for(let i = 0; i < subDatabase.length; i++) {
        //     webpush.sendNotification(subDatabase[i], message);
        //     console.log(`${i}. verimiz: `, subDatabase[i])
        // }

        if (data.trim() == "/deleteall") {
            db.run("DELETE FROM messages;");
            io.emit("deleteAllMessages");
        }
        else if (data.trim().slice(0, 5) === 'clear' && data.trim().length == 6) {
            // db.run(`DELETE FROM messages WHERE id IN (SELECT id FROM messages ORDER BY id DESC LIMIT ${data.trim()[5]});`);


            db.run(`UPDATE messages SET isDeleted = 1 WHERE id IN (SELECT id FROM messages ORDER BY id DESC LIMIT ${data.trim()[5]});`, function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`Updated ${this.changes} record(s)`);
            });


            io.emit("sondanSil", data.trim()[5])
        }


        else if (data.trim().slice(0, 5) === 'clear' && message.length == 7) {
            let sum = data[5] + data[6]
            // db.run(`DELETE FROM messages WHERE id IN (SELECT id FROM messages ORDER BY id DESC LIMIT ${sum});`);
            db.run(`UPDATE messages SET isDeleted = 1 WHERE id IN (SELECT id FROM messages ORDER BY id DESC LIMIT ${sum});`);
            io.emit("sondanSil", sum)
        }
        else {
            db.run(
                "INSERT INTO messages (username, message, date, time) VALUES (?, ?, ?, ?)",
                [currentUsername, message, getCurrentDate(), getCurrentTime()],
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
                    webpush.sendNotification(JSON.parse(subDatabaseValue), message);
                    console.log("İşlemek istediğim veri: ", JSON.parse(subDatabaseValue))
                });
            });
        }
    });

    socket.on("getInitialMessages", () => {
        db.all("SELECT * FROM messages WHERE isDeleted = 0", (err, rows) => {
            if (err) {
                console.error(err.message);
            } else {
                socket.emit("initialMessages", { mesajlar: rows, currentDate: getCurrentDate() });
            }
        });
    });


    socket.on("message", (data) => {
        console.log("Yeni bir mesaj alındı: ", data);
    });

    socket.on("deleteMessage", (messageId) => {

        db.run("UPDATE messages SET isDeleted = 1 WHERE id = ?", [messageId], function (err) {
            if (err) {
                return console.error(err.message);
            }

            io.emit("deleteMessageBroadcast", messageId);
        });
    })
});

app.use(express.static(__dirname + "/public"));

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;

server.listen(PORT, HOST, () => {
    console.log(
        `Sunucu ${PORT} numaralı portta ve ${HOST} IP adresinde başlatıldı.`
    );
});