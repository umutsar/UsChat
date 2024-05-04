

const dropdownMenu = document.getElementById("dropdownMenu");


document.getElementById("plusIconParent").addEventListener("click", function () {
    var plusIcon = document.getElementById("plusIcon");

    // İkinci Geri Basış 
    if (plusIcon.classList.contains("rotated")) {
        plusIcon.classList.remove("rotated");
        plusIcon.classList.add("rotatedReverse");
        dropdownMenu.style.display = "none"


        // İlk basış
    } else { // Değilse, 225 derece döndür
        plusIcon.classList.add("rotated");
        plusIcon.classList.remove("rotatedReverse");
        dropdownMenu.style.display = "inline-block"
    }
});
