//  SCROLL İŞLEMLERİ

let countMessage = 20;
let flag = 1;
let endFlag = 0;


document.getElementById("messages").addEventListener('scroll', function () {
    // Başka işler için:

    closeDropdownMenu();

    let messages = document.getElementById("messages")
    console.log("scrolll", messages.scrollHeight)

    if (screenWidth2 >= 0 && screenWidth2 <= 767) {
        scrollForPhone();
    }
    else {
        scrollForComputer();
    }
});


document.getElementById("asagiInmeButonuParent").addEventListener("click", () => {
    console.log("şimdi başardın. ")
    let messages = document.getElementById("messages");
    // messages.scrollTop = messages.scrollHeight;
    slowlyScrollDown(messages, 32);
    document.getElementById("asagiInmeButonuParent").style.backgroundColor = "inherit"
    document.getElementById("asagiInmeButonu").style.border = "none"
    document.getElementById("notificationCount").innerText = "";
    count = 0;
})