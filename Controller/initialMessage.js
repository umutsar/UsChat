
const { io } = require("./socketServer");
const { db } = require("./databaseConnection")
const { getCurrentDate, getCurrentTime } = require('../Modules/TimeFunction');
const { param } = require("../routes/logoutRoute");
const { ERROR } = require("sqlite3");


const initialMessages = () => {
    io.on("connection", (socket) => {
        const username = socket.request.session.username;

        /*
        db.get("SELECT kullaniciadi FROM kullanicilar WHERE kullaniciadi = ?", ['aspa'], (err, row) => {
            if(err) {
                console.log(err.message)
            } else if(row){
                console.log(row)
            } else {
                console.log("ikisi de değil.")
            }
        })
        */


        socket.on("getInitialMessages", (data) => {
            if (username && data) {

                let chatsQuery = `
                    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                    "username" TEXT,
                    "message" TEXT,
                    "date" TEXT,
                    "time" TEXT,
                    "isDeleted" BLOB DEFAULT 0,
                    "ip" TEXT,
                    "photoPath" TEXT,
                    "count" INTEGER
                `;

                let connectionQuery = `
                    "id"	INTEGER,
                    "user"	TEXT UNIQUE,
                    "connection" INTEGER DEFAULT 1,
                    "isBlocked"	BLOB DEFAULT 0,
                    PRIMARY KEY("id" AUTOINCREMENT)
                `;

                db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name = ?`, [`${username}_${data}`], (err, row) => {
                    if (err) {
                        console.error('Hata:', err.message);
                        return;
                    }

                    else {
                        if (!row) {

                            db.run(`CREATE TABLE IF NOT EXISTS ${username}_${data} (${chatsQuery});`, function (err) {
                                if (err) {
                                    return console.error('İlk tablo oluşturulurken hata:', err.message);
                                }

                                db.run(`CREATE TABLE IF NOT EXISTS ${data}_${username} (${chatsQuery});`, function (err) {
                                    if (err) {
                                        return console.error('İlk tablo oluşturulurken hata:', err.message);
                                    }
                                });

                            });

                        }
                    }

                    // BU SATIRLAR KAYDOLDUKTAN SONRA OTOMATİK OLUŞTURULMASI GEREKİYOR.
                    db.run(`INSERT OR REPLACE INTO ${username} (user, date, time) VALUES (?, ?, ?)`, [data, getCurrentDate(), getCurrentTime()], (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            db.run(`INSERT OR REPLACE INTO ${data} (user, date, time) VALUES (?, ?, ?)`, [username, getCurrentDate(), getCurrentTime()], (err) => {
                                if (err) {
                                    console.log(err.message);
                                }
                            });
                        }
                    });

                    // ****************************************************************

                });


                // Veritabanı satır kontrolü yeri:

                let rowCount;

                db.get(`SELECT COUNT(*) as count FROM (SELECT * FROM ${username}_${data} UNION SELECT * FROM ${data}_${username}) AS combined_table`, (err, result) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        rowCount = result.count;
                    }
                });


                const sqlQuery = `
                        SELECT * FROM (
                            SELECT *, count AS total_count FROM ${username}_${data} WHERE isDeleted = 0
                            UNION
                            SELECT *, count AS total_count FROM ${data}_${username} WHERE isDeleted = 0
                        )
                        ORDER BY total_count DESC
                        LIMIT 20 OFFSET 0;
                `;

                db.all(sqlQuery, (err, rows) => {
                    if (err) {
                        // Hata yönetimi buraya eklenebilir.
                    } else {
                        socket.emit("initialMessages", {
                            kullaniciadi: username,
                            mesajlar: rows.reverse(),
                            currentDate: getCurrentDate(),
                            rowCountKey: rowCount
                        });
                    }
                });
            }
        });




        async function fetchRowCount(parameter) {
            return new Promise((resolve, reject) => {

                db.get(`SELECT COUNT(*) as count FROM (
                    SELECT * FROM ${username}_${parameter} WHERE isDeleted = 0
                    UNION
                    SELECT * FROM ${parameter}_${username} WHERE isDeleted = 0
                ) AS combined_table`, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.count);
                    }
                });
            });
        }


        // SCROLL İÇİN 20 MESAJ VERME YERİ
        socket.on("yirmiMesajVer", async (queue, data) => {

            try {
                let rowCount = await fetchRowCount(data);

                let sqlQuery = `SELECT * FROM (
                        SELECT * FROM ${username}_${data} WHERE isDeleted = 0
                        UNION
                        SELECT * FROM ${data}_${username} WHERE isDeleted = 0
                    ) AS combined_table
                    ORDER BY count DESC`;
                // console.log(`rowCount: ${rowCount}, queue: ${queue}`);

                if (rowCount >= queue + 20) {
                    sqlQuery += ` LIMIT ${rowCount - queue - 20} OFFSET ${queue + 20}`;

                    db.all(sqlQuery, (err, rows) => {
                        if (err) {
                            console.error(err.message);
                        } else {
                            //console.log("üstteki" ,rows)
                            socket.emit("yirmiMesajiAl", { mesajlar: rows, currentDate: getCurrentDate(), rowCountKey: rowCount, end: 0 });
                        }
                    });
                }


                else {
                    if (queue < rowCount) {
                        sqlQuery += ` LIMIT ${rowCount - 20 - queue} OFFSET ${queue + 20}`;
                        db.all(sqlQuery, (err, rows) => {
                            if (err) {
                                console.error(err.message);
                            } else {

                                socket.emit("yirmiMesajiAl", { mesajlar: rows, currentDate: getCurrentDate(), rowCountKey: rowCount, end: 1 });
                            }
                        });
                    }
                }


            } catch (error) {
                console.error(error.message);
            }
        });
    })

}

module.exports = initialMessages;


