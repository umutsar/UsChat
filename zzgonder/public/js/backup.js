

function submitForm() {
    var formData = new FormData();
    var messageInputValue = document.getElementById("messageInput").value;

    formData.append("messageInput", messageInputValue);

    // Fotoğraf dosyalarını ekle
    for (var i = 1; i <= 3; i++) {
        var fileInput = document.getElementById("fileInput" + i).files[0];
        if (fileInput) {
            formData.append("fileInput" + i, fileInput);
        }
    }

    // Ses dosyasını ekle
    var audioInput = document.getElementById("fileInput3").files[0];
    if (audioInput) {
        formData.append("audioInput", audioInput);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendInput", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            // Formu gönderdikten sonra input alanlarını sıfırla
            document.getElementById("messageInput").value = "";

            for (var i = 1; i <= 3; i++) {
                document.getElementById("fileInput" + i).value = "";
            }

            document.getElementById("audioPreview").style.display = "none";

            if (screenWidth2 >= 0 && screenWidth2 <= 767) {
                document.getElementById("messages").style.maxHeight = "74vh";
                document.getElementById("messages").style.height = "74vh";
            } else {
                document.getElementById("messages").style.maxHeight = "80vh";
                document.getElementById("messages").style.height = "80vh";
            }

            messages.scrollTop = messages.scrollHeight;
        }
    };

    xhr.send(formData);
}
