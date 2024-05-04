

socket.on("initialMessages", (mesajlar) => {
   console.log("initial message.")
   console.log(mesajlar)

   setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
   }, 300);

   document.getElementById("messages").innerHTML = "";
   mesajlar["mesajlar"].forEach((data) => {

      countMessage = 0;
      if (data["date"] != previousDate) {

         if (mesajlar["currentDate"] == data["date"]) {
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Bugün"
            document.getElementById("messages").appendChild(dateDiv);
         }

         else if (parseInt(data["date"].split(".")[0]) + 1 == parseInt(mesajlar["currentDate"].split(".")[0])) {
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = "Dün"
            document.getElementById("messages").appendChild(dateDiv);
         }

         else {
            const dateDiv = document.createElement("div");
            dateDiv.setAttribute("class", "dateDiv");
            dateDiv.innerText = `${data["date"]}`
            document.getElementById("messages").appendChild(dateDiv);
         }
      }


      const messageElement = document.createElement("div");

      // Initial için her ikisi varsa
      if (data["message"] && data["photoPath"]) {
         if (toPerson != data["username"] || mesajlar["kullaniciadi"] == 'admin') {
            messageElement.setAttribute("class", "message altAlta");
            messageElement.innerHTML = `
             <div id="ilkIkisi">
                      <div class="userOfMessage">${data["username"]}: </div>
 
                         <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>
 
                         <div class="onlyMessage">
                            <span>${data["message"]}</span>
                            <span class="mesajinSagTarafi">
                               <span class="timeInformation">${data["time"].split(":")[0] + ":" + data["time"].split(":")[1]}</span>
                               <button class="silButonlari silButonlariResmi" value="${data["count"]}"></button>
                            </span>
                      </div>
                </div>
             `;
         }

         else {
            messageElement.setAttribute("class", "message altAlta");
            messageElement.innerHTML = `
             <div id="ilkIkisi">
                      <div class="userOfMessage">${data["username"]}: </div>
 
                         <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>
 
                         <div class="onlyMessage">
                            <span>${data["message"]}</span>
                            <span class="mesajinSagTarafi">
                               <span class="timeInformation">${data["time"].split(":")[0] + ":" + data["time"].split(":")[1]}</span>
                            </span>
                      </div>
                </div>
             `;
         }

      }

      // Initial için sadece fotoğraf varsa
      else if (!data["message"] && data["photoPath"]) {
         if (toPerson != data["username"] || mesajlar["kullaniciadi"] == 'admin') {
            messageElement.setAttribute("class", "message altAlta");
            messageElement.innerHTML = `
                   <div id="ilkIkisi">
                         <div class="userOfMessage">${data["username"]}: </div>
                            <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>
                         <div class="onlyMessage">
                            <span>${data["message"]}</span>
                            <span class="mesajinSagTarafi">
                               <span class="timeInformation">${data["time"].split(":")[0] + ":" + data["time"].split(":")[1]}</span>
                               <button class="silButonlari silButonlariResmi" value="${data["count"]}"></button>
                            </span>
                         </div>
                   </div>
                `;
         }

         else {
            console.log("else içersinde.")
            messageElement.setAttribute("class", "message altAlta");
            messageElement.innerHTML = `
                   <div id="ilkIkisi">
                         <div class="userOfMessage">${data["username"]}: </div>
                            <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>
                         <div class="onlyMessage">
                            <span>${data["message"]}</span>
                            <span class="mesajinSagTarafi">
                               <span class="timeInformation">${data["time"].split(":")[0] + ":" + data["time"].split(":")[1]}</span>
                            </span>
                         </div>
                   </div>
                `;
         }
      }

      // Initial için sadece mesaj varsa
      else {
         if (toPerson != data["username"] || mesajlar["kullaniciadi"] == 'admin') {
            messageElement.setAttribute("class", "message");
            messageElement.innerHTML = `
                <div id="ilkIkisi">
                <div class="userOfMessage">${data["username"]}: </div>
                   <div class="onlyMessage">
                      <span>${data["message"]}</span>
                      <span class="mesajinSagTarafi">
                         <span class="timeInformation">${data["time"].split(":")[0] + ":" + data["time"].split(":")[1]}</span>
                         <button class="silButonlari silButonlariResmi" value="${data["count"]}"></button>
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
                         <span class="timeInformation">${data["time"].split(":")[0] + ":" + data["time"].split(":")[1]}</span>
                      </span>
                   </div>
                </div>
          `;
         }
      }

      messages.appendChild(messageElement);

      previousDate = data["date"]
   });
});