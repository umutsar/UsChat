

const scrollForPhone = () => {
    if (messages.children.length > 15) {

        if (messages.scrollTop < messages.scrollHeight - messages.clientHeight) {

            if (messages.scrollTop + messages.clientHeight + (messages.clientHeight / 2) >= messages.scrollHeight) {

                document.getElementById("notificationCount").innerText = " ";
                count = 0;
                document.getElementById("asagiInmeButonuParent").style.display = "none"
                document.getElementById("asagiInmeButonuParent").style.backgroundColor = "inherit"
                document.getElementById("asagiInmeButonu").style.border = "none"

                document.getElementById("inputs").style.width = "90vw"
            }

            else if (messages.scrollTop == 0) {
                console.log("sıfırlandı.")
                count = 0
                if (endFlag == 0) {

                    setTimeout(function () {
                        document.getElementById("messages").style.overflow = 'hidden';
                        setTimeout(() => {
                            document.getElementById("messages").style.overflow = 'auto';
                            messages.scrollTop = 1;
                        }, 10);
                    }, 300);



                    console.log("yirmimesajver calisti.")

                    if (flag) {
                        socket.emit("yirmiMesajVer", countMessage, toPerson);
                        countMessage += 20;
                        flag = 0;
                        raiseTheFlag();
                    }
                }
            }

            else {
                document.getElementById("asagiInmeButonuParent").style.display = "flex";

                if (screenWidth2 >= 0 && screenWidth2 <= 767) {
                    document.getElementById("inputs").style.width = "80vw"
                }
                else {
                    document.getElementById("inputs").style.width = "40vw"
                }
            }
        }

        else {
            document.getElementById("asagiInmeButonuParent").style.display = "none";
        }
    }

    else {
        document.getElementById("asagiInmeButonuParent").style.display = "none";
    }
}
