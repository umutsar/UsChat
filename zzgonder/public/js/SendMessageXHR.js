let screenWidth2 = window.innerWidth;
const messages = document.getElementById("messages");


function submitForm() {
    var formData = new FormData();
    var messageInputValue = document.getElementById("messageInput").value;
    var fileInput = document.getElementById("fileInput").files[0];

    formData.append("messageInput", messageInputValue);
    formData.append("fileInput", fileInput);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendInput", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };

    xhr.send(formData);

    document.getElementById("fileInput").value = "";

    document.getElementById("imagePreviewParent").style.display = "none"

    if (screenWidth2 >= 0 && screenWidth2 <= 767) {
        document.getElementById("messages").style.maxHeight = "74vh";
        document.getElementById("messages").style.height = "";
    }

    else {
        document.getElementById("messages").style.maxHeight = "80vh";
        document.getElementById("messages").style.height = "";
    }



    setTimeout(() => {
        if (document.getElementById("messageInput").value != "") {
            document.getElementById("messages").scrollTop = messages.scrollHeight;

            document.getElementById("messageInput").value = "";
        }
    }, 120);
}


function logout() {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "/logout", true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send();
}

function sendPhoto() {
    var xhr3 = new XMLHttpRequest();
    xhr3.open("POST", "/upload", true);
    xhr3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr3.send();
}

