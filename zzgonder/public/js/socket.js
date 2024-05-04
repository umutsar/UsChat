

const socket = io();

let count = 0;

let previousDate = "";

socket.on("initialMessages", (mesajlar) => {

   setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
   }, 300);

   console.log(mesajlar)
   mesajlar["mesajlar"].forEach((data) => {


      if (data["date"] != previousDate) {

         if (mesajlar["currentDate"] == data["date"]) {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Bugün"
            messages.appendChild(dateDiv);
         }
         else if (parseInt(data["date"].split(".")[0]) + 1 == parseInt(mesajlar["currentDate"].split(".")[0])) {
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


      if (data["message"] && data["photoPath"]) {
         messageElement.setAttribute("class", "message altAlta");

         messageElement.innerHTML = `
            <div id="ilkIkisi">
                     <div class="userOfMessage">${data["username"]}: </div>

                        <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>

                        <div class="onlyMessage">
                           <span>${data["message"]}</span>
                           <span class="mesajinSagTarafi">
                              <span class="timeInformation">${data["time"]}</span>
                              <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                           </span>
                     </div>
               </div>
            `;
      }


      else if (!data["message"] && data["photoPath"]) {
         console.log("socket message is active...")
         messageElement.setAttribute("class", "message altAlta");
         messageElement.innerHTML = `
               <div id="ilkIkisi">
                     <div class="userOfMessage">${data["username"]}: </div>

                        <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>

                     <div class="onlyMessage">
                        <span>${data["message"]}</span>
                        <span class="mesajinSagTarafi">
                           <span class="timeInformation">${data["time"]}</span>
                           <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                        </span>
                     </div>
               </div>
            `;
      }


      else {
         messageElement.setAttribute("class", "message");
         messageElement.innerHTML = `
            <div id="ilkIkisi">
            <div class="userOfMessage">${data["username"]}: </div>


            <div class="onlyMessage">
               <span>${data["message"]}</span>
               <span class="mesajinSagTarafi">
                  <span class="timeInformation">${data["time"]}</span>
                  <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
               </span>
            </div>
         </div>
      `;
      }


      messages.appendChild(messageElement);


      previousDate = data["date"]
   });
});



socket.on("yirmiMesajiAl", (mesajlar) => {
   mesajlar["mesajlar"].forEach((data) => {

      if (data["date"] != previousDate && data != undefined) {

         if (mesajlar["currentDate"] == data["date"]) {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Bugün"
            messages.insertBefore(dateDiv, messages.firstChild);
         }
         else if (parseInt(data["date"].split(".")[0]) + 1 == parseInt(mesajlar["currentDate"].split(".")[0])) {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Dün"            
            messages.insertBefore(dateDiv, messages.firstChild);
         }

         else {
            const messages = document.getElementById("messages");
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = `${data["date"]}`
            messages.insertBefore(dateDiv, messages.firstChild);
         }
      }

      const messages = document.getElementById("messages");

      const messageElement = document.createElement("div");


      if (data["message"] && data["photoPath"]) {
         messageElement.setAttribute("class", "message altAlta");

         messageElement.innerHTML = `
            <div id="ilkIkisi">
                     <div class="userOfMessage">${data["username"]}: </div>

                        <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>

                        <div class="onlyMessage">
                           <span>${data["message"]}</span>
                           <span class="mesajinSagTarafi">
                              <span class="timeInformation">${data["time"]}</span>
                              <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                           </span>
                     </div>
               </div>
            `;
      }


      else if (!data["message"] && data["photoPath"]) {
         messageElement.setAttribute("class", "message altAlta");
         messageElement.innerHTML = `
               <div id="ilkIkisi">
                     <div class="userOfMessage">${data["username"]}: </div>

                        <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>

                     <div class="onlyMessage">
                        <span>${data["message"]}</span>
                        <span class="mesajinSagTarafi">
                           <span class="timeInformation">${data["time"]}</span>
                           <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                        </span>
                     </div>
               </div>
            `;
      }


      else {
         messageElement.setAttribute("class", "message");
         messageElement.innerHTML = `
            <div id="ilkIkisi">
            <div class="userOfMessage">${data["username"]}: </div>


            <div class="onlyMessage">
               <span>${data["message"]}</span>
               <span class="mesajinSagTarafi">
                  <span class="timeInformation">${data["time"]}</span>
                  <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
               </span>
            </div>
         </div>
      `;
      }

      messages.insertBefore(messageElement, messages.firstChild);


      previousDate = data["date"]
   });
})



socket.on("message", (data) => {
   countMessage++;
   count++;
   if (count != 0) {
      document.getElementById("notificationCount").innerText = `${count}`
   }

   document.getElementById("asagiInmeButonu").style.border = "1px solid green"

   console.log(data);
   const messages = document.getElementById("messages");
   const messageElement = document.createElement("div");


   if (data["message"] && data["photoPath"]) {
      messageElement.setAttribute("class", "message altAlta");

      messageElement.innerHTML = `
         <div id="ilkIkisi">
                  <div class="userOfMessage">${data["username"]}: </div>

                     <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>

                     <div class="onlyMessage">
                        <span>${data["message"]}</span>
                        <span class="mesajinSagTarafi">
                           <span class="timeInformation">${data["time"]}</span>
                           <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                        </span>
                  </div>
            </div>
         `;
   }


   else if (!data["message"] && data["photoPath"]) {
      messageElement.setAttribute("class", "message altAlta");
      messageElement.innerHTML = `
            <div id="ilkIkisi">
                  <div class="userOfMessage">${data["username"]}: </div>

                     <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>

                  <div class="onlyMessage">
                     <span>${data["message"]}</span>
                     <span class="mesajinSagTarafi">
                        <span class="timeInformation">${data["time"]}</span>
                        <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
                     </span>
                  </div>
            </div>
         `;
   }


   else {
      messageElement.setAttribute("class", "message");
      messageElement.innerHTML = `
         <div id="ilkIkisi">
         <div class="userOfMessage">${data["username"]}: </div>


         <div class="onlyMessage">
            <span>${data["message"]}</span>
            <span class="mesajinSagTarafi">
               <span class="timeInformation">${data["time"]}</span>
               <button class="silButonlari silButonlariResmi" value="${data["id"]}"></button>
            </span>
         </div>
      </div>
   `;
   }


   messages.appendChild(messageElement);
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

// const messageInput = document.getElementById("messageInput");
// messageInput.addEventListener("keypress", (e) => {
//    if (e.key === "Enter") {
//       sendMessage();
//    }
// });

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
         silButonlari[i].parentElement.parentElement.parentElement.parentElement.remove();
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
