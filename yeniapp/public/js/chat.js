

const socket = io();

let previousDate = "";

socket.on("initialMessages", (mesajlar) => {

   mesajlar["mesajlar"].forEach((data) => {
      

      if (data["date"] != previousDate) {

         if (mesajlar["currentDate"] == data["date"]) {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Bugün"
            messages.appendChild(dateDiv);
         }
         else if(parseInt(data["date"].split(".")[0]) + 1 == parseInt(mesajlar["currentDate"].split(".")[0])) {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Dün"
            messages.appendChild(dateDiv);
         }

         else {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = `${data["date"]}`
            messages.appendChild(dateDiv);
         }

      }

      const messages = document.getElementById("messages");
      const messageElement = document.createElement("div");
      messageElement.setAttribute("class", "message");
      messageElement.innerHTML = `
               <div id="ilkIkisi">
                     <div class="userOfMessage">${data["username"]}: </div>
                     <div class="onlyMessage">
                        <span class="fixedMessage">${data["message"]}</span>
                     </div>
               </div>

               <div class="mesajinSagTarafi">
                  <span class="timeInformation">${data["time"]}</span>
                  <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
               </div>
            `;
      messages.appendChild(messageElement);
      messages.scrollTop = messages.scrollHeight;
      previousDate = data["date"]
   });
});

socket.on("message", (data) => {
   console.log(data);
   const messages = document.getElementById("messages");
   const messageElement = document.createElement("div");
   messageElement.setAttribute("class", "message");
   messageElement.innerHTML = `
                  <div id="ilkIkisi">
                        <div class="userOfMessage">${data["username"]}: </div>
                        <div class="onlyMessage">
                           <span>${data["message"]}</span>
                        </div>
                  </div>

                  <div class="mesajinSagTarafi">
                     <span class="timeInformation">${data["time"]}</span>
                     <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                  </div>
            `;
   messages.appendChild(messageElement);
   messages.scrollTop = messages.scrollHeight;
});

function sendMessage() {
   const messageInput = document.getElementById("messageInput");
   const message = messageInput.value;
   if (message != "") {
      socket.emit("sendMessage", message);
      messageInput.value = "";
   }
}

socket.on("connect", () => {
   socket.emit("getInitialMessages");
});

const messageInput = document.getElementById("messageInput");
messageInput.addEventListener("keypress", (e) => {
   if (e.key === "Enter") {
      sendMessage();
   }
});

socket.on("deleteAllMessages", () => {
   const messages = document.getElementById("messages");
   messages.innerHTML = "";
});

socket.on("sondanSil", (sondanSilData) => {
   let silinecekler = document.querySelectorAll(".message");
   silinecekler[silinecekler.length - 1].remove();

   for (let i = 1; i <= sondanSilData; i++) {
      silinecekler[silinecekler.length - i].remove();
   }
});

socket.on("deleteMessageBroadcast", (messageId) => {
   var silButonlari = document.getElementsByClassName('silButonlari');

   for (var i = 0; i < silButonlari.length; i++) {
      if (silButonlari[i].value === messageId) {
         silButonlari[i].parentElement.parentElement.remove();
      }
   }
});

document.addEventListener('click', function (event) {
   if (event.target.classList.contains('silButonlari')) {
      // Tıklanan button'un value özelliğini al
      var buttonValue = event.target.value;

      socket.emit("deleteMessage", buttonValue)
   }
});