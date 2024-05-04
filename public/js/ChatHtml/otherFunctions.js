

const closeDropdownMenu = () => {
    var plusIcon = document.getElementById("plusIcon");

    // Eğer dropdown menü açıksa kapat
    if (plusIcon.classList.contains("rotated")) {
        plusIcon.classList.remove("rotated");
        plusIcon.classList.add("rotatedReverse");
        dropdownMenu.style.display = "none";
    }
}


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

const raiseTheFlag = () => {
    setTimeout(() => {
        flag = 1;
    }, 1000);
}


if (messages.children.length < 15) {
    document.getElementById("asagiInmeButonuParent").style.display = "none";
}


