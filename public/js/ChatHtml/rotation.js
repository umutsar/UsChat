const dropdownMenu = document.getElementById("dropdownMenu");
const plusIconParent = document.getElementById("plusIconParent");

// "plusIconParent" üzerine tıklanıldığında
plusIconParent.addEventListener("click", function (event) {
    var plusIcon = document.getElementById("plusIcon");

    // İkinci Geri Basış 
    if (plusIcon.classList.contains("rotated")) {
        plusIcon.classList.remove("rotated");
        plusIcon.classList.add("rotatedReverse");
        dropdownMenu.style.display = "none";

    // İlk basış
    } else { // Değilse, 225 derece döndür
        plusIcon.classList.add("rotated");
        plusIcon.classList.remove("rotatedReverse");
        dropdownMenu.style.display = "inline-block";
    }

    // Tıklamayı durdur (dropdown menüyü kapatmaması için)
    event.stopPropagation();
});

// Document üzerine tıklanıldığında dropdown menüyü kapat
document.addEventListener("click", function () {
    var plusIcon = document.getElementById("plusIcon");
    
    // Eğer dropdown menü açıksa kapat
    if (plusIcon.classList.contains("rotated")) {
        plusIcon.classList.remove("rotated");
        plusIcon.classList.add("rotatedReverse");
        dropdownMenu.style.display = "none";
    }
});
