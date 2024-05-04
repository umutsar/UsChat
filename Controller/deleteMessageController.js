
const { io } = require("./socketServer");
const { db } = require("./databaseConnection")

const deleteMessageController = () => {
    io.on("connection", (socket) => {
        const username = socket.request.session.username;

        if (username) {

            socket.on("deleteMessage", (messageId, secondParameter) => {
                db.run(`UPDATE ${username}_${secondParameter} SET isDeleted = 1 WHERE count = ?`, [messageId], function (err) {
                    if (err) {
                        return console.error(err.message);
                    }

                    db.run(`UPDATE ${secondParameter}_${username} SET isDeleted = 1 WHERE count = ?`, [messageId], function (err) {
                        if (err) {
                            return console.error(err.message);
                        }

                        io.emit("deleteMessageBroadcast", messageId);
                    });
                });
            })

        }
    })
}

module.exports = deleteMessageController;