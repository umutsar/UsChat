

const scrollForComputer = () => {
    if (messages.children.length > 15) {

        if (messages.scrollTop < messages.scrollHeight - messages.clientHeight) {

            if (messages.scrollTop + messages.clientHeight + (messages.clientHeight / 2) >= messages.scrollHeight) {

                document.getElementById("notificationCount").innerText = " ";
                count = 0;
                document.getElementById("asagiInmeButonuParent").style.display = "none"
                document.getElementById("asagiInmeButonuParent").style.backgroundColor = "inherit"
                document.getElementById("asagiInmeButonu").style.border = "none"

                document.getElementById("inputs").style.width = "40vw"
            }

            else if (messages.scrollTop == 0) {
                if (endFlag == 0) {
                    if (screenWidth2 >= 0 && screenWidth2 <= 767) {
                        messages.scrollTop = 1;
                    }
                    else {
                        messages.scrollTop = 1;
                    }

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
                document.getElementById("inputs").style.width = "40vw";
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
