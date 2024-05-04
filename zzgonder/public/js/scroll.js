//  SCROLL İŞLEMLERİ

let countMessage = 20;
let flag = 0;


if (messages.children.length < 15) {
    document.getElementById("asagiInmeButonuParent").style.display = "none";
}


document.getElementById("messages").addEventListener('scroll', function () {

    let messages = document.getElementById("messages")
    if (messages.children.length > 15) {

        if (messages.scrollTop < messages.scrollHeight - messages.clientHeight) {

            if (messages.scrollTop + messages.clientHeight + (messages.clientHeight / 2) >= messages.scrollHeight) {

                document.getElementById("notificationCount").innerText = " ";
                document.getElementById("asagiInmeButonuParent").style.display = "none"
                document.getElementById("asagiInmeButonuParent").style.backgroundColor = "inherit"
                document.getElementById("asagiInmeButonu").style.border = "none"

                if (screenWidth2 >= 0 && screenWidth2 <= 767) {
                    document.getElementById("inputs").style.width = "90vw"
                }
                else {
                    document.getElementById("inputs").style.width = "40vw"
                }
            }

            else if (messages.scrollTop == 0) {
                messages.scrollTop = 15;
                console.log("yirmimesajver calisti.")

                socket.emit("yirmiMesajVer", countMessage);
                countMessage += 20;
            }

            else {
                document.getElementById("asagiInmeButonuParent").style.display = "flex";

                if (screenWidth2 >= 0 && screenWidth2 <= 767) {
                    document.getElementById("inputs").style.width = "90vw"
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
});


function slowlyScrollDown(element, speed) {
    var targetScrollTop = element.scrollHeight;
    var currentScrollTop = element.scrollTop;

    if (Math.abs(targetScrollTop - currentScrollTop) > 5) {
        var delta = (targetScrollTop - currentScrollTop) / speed;
        element.scrollTop += delta;

        if (!(element.scrollTop + element.clientHeight + 12 > element.scrollHeight)) {
            requestAnimationFrame(function () {
                slowlyScrollDown(element, speed);
            });
        }
        else {
            return
        }

    } else {
        console.log("Scroll animasyonu tamamlandı!");
    }
}

document.getElementById("asagiInmeButonuParent").addEventListener("click", () => {
    let messages = document.getElementById("messages");
    // messages.scrollTop = messages.scrollHeight;
    slowlyScrollDown(messages, 32);
    document.getElementById("asagiInmeButonuParent").style.backgroundColor = "inherit"
    document.getElementById("asagiInmeButonu").style.border = "none"
    document.getElementById("notificationCount").innerText = "";
    document.getElementById("inputs").style.width = "90vw"
})
