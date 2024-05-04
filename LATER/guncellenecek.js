const express = require("express");

const http = require("http");
const socketIo = require("socket.io");
const sqlite3 = require("sqlite3").verbose();
const webpush = require("web-push");
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);

const db = new sqlite3.Database("mesajlar.db");

const sessionCheckMiddleware = (req, res, next) => {
    if (req.url === '/chat.html' && !req.session.userId) {
        // /chat.html sayfasına yönlendirme, oturum açılmamışsa
        return res.redirect('/');
    }
    next();
};

// app.use(sessionCheckMiddleware);


const apiKeys = {
    publicKey: "BLi8a7hnhOj4nlZUSg9g_qhnNg8t-FRoCRkbcu0lYFlUJpCKLra6I3iKJF1e_EWZfKmn8RRJBeYlkxtQjk0wwwI",
    privateKey: "zJCClfI4hcA77NxC4BhS3wuXI1CVdo04FQBkxbfrMy4",
}

webpush.setVapidDetails(
    'mailto:u05398552445@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

const subDatabase = [];


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
                    
                    else if(row && row.isActive == 0) {
                        socket.emit("loginResponse", { success: "notActive"});
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


            db.run(`UPDATE messages SET isDeleted = 1 WHERE id IN (SELECT id FROM messages ORDER BY id DESC LIMIT ${data.trim()[5]});`, function(err) {
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
                socket.emit("initialMessages", {mesajlar: rows, currentDate: getCurrentDate()});
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