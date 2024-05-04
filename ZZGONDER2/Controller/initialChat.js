
const { io } = require("./socketServer");
const { db } = require("./databaseConnection")
const { getCurrentDate, getCurrentTime } = require('../Modules/TimeFunction');
const { param } = require("../routes/logoutRoute");


const isToday = (parameter) => {
    if (getCurrentDate() == parameter) {
        return true;
    }
    else {
        return false;
    }
}

const initialChat = () => {
    io.on("connection", (socket) => {

        socket.on("fetchChats", () => {
            let username = socket.request.session.username;


            db.run(`UPDATE kullanicilar SET sessionId = ? WHERE kullaniciadi = ?`, [socket.id, username], function (err) {
                if (err) {
                    return console.error(err.message);
                }
            });
            const socketEmitPromise = (parameter) => {
                return new Promise((resolve, reject) => {
                    db.get(`
                        SELECT * FROM 
                        (SELECT * FROM ${parameter}_${username} WHERE isDeleted = 0
                        UNION
                        SELECT * FROM ${username}_${parameter} WHERE isDeleted = 0)
                        AS combined_table ORDER BY count DESC LIMIT 1;  
                    `, (err, row) => {
                        if (err) { console.log(err.message) }
                        else {
                            resolve(row)
                        }
                    })
                })
            }


            const createUserTableQuery = `
                "id"	INTEGER,
                "user"	TEXT UNIQUE,
                "connection"	INTEGER DEFAULT 1,
                "isBlocked"	BLOB DEFAULT 0,
                "date"	TEXT,
                "time"	TEXT,
                PRIMARY KEY("id" AUTOINCREMENT)
            `


            db.run(`CREATE TABLE IF NOT EXISTS ${socket.request.session.username} (${createUserTableQuery});`, (err) => {
                if (err) { console.log(err.message) }


                else {
                    db.all(`SELECT user FROM ${socket.request.session.username} ORDER BY DATE(date) DESC, TIME(time) DESC;`, (err, rows) => {
                        if (err) {
                            console.log(err);
                            return;
                        }

                        let promises = [];
                        let resultObject = {};

                        rows.forEach(element => {

                            let promise = socketEmitPromise(element.user).then((result) => {

                                let key = getCurrentDate() == result.date ? result.time : result.date;

                                if (!resultObject[key]) {
                                    resultObject[key] = [];
                                }
                                if (isToday(result.date) == true) {
                                    resultObject[key].push({ user: element.user, lastMessage: result.message, time: result.time, isToday: true });
                                }
                                else {
                                    resultObject[key].push({ user: element.user, lastMessage: result.message, time: result.date, isToday: false });
                                }

                            });

                            promises.push(promise);
                        });

                        Promise.all(promises).then(() => {
                            // Sonuçları doğru sıralamak için resultObject'ı işleyin
                            let sortedKeys = Object.keys(resultObject).sort().reverse();
                            let sortedArray = [];

                            sortedKeys.forEach(key => {
                                sortedArray = sortedArray.concat(resultObject[key]);
                            });

                            // Emit işlemi
                            socket.emit("handlerChats", sortedArray);
                        }).catch(err => {
                            console.log(err);
                        });
                    });
                }
                
            })





        })

        let timeouts = {};



        socket.on("searchUser", (data) => {
            if (data) {
                clearTimeout(timeouts[socket.request.session.username]);

                timeouts[socket.request.session.username] = setTimeout(() => {
                    db.all(`SELECT kullaniciadi FROM kullanicilar WHERE kullaniciadi LIKE '%${data}%'`, (err, rows) => {
                        if (err) { console.log(err.message); }
                        else {
                            socket.emit("handleSearchUser", rows)
                        }
                    })
                }, 500);
            }
        })
    })
}

module.exports = initialChat;