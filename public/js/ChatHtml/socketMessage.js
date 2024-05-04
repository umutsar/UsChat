
let isMyMessageControl = false;
socket.on("message", (data) => {
   if (document.getElementById("messages").scrollTop == document.getElementById("messages").scrollHeight) {
      flagscroll = 1;
   }

   countMessage++;
   count++;
   if (count != 0) {
      document.getElementById("notificationCount").innerText = `${count}`
   }

   document.getElementById("asagiInmeButonu").style.border = "1px solid green"

   const messages = document.getElementById("messages");
   const messageElement = document.createElement("div");

   if (pageFlag) {

      // Her ikisi varsa
      if (data["message"] && data["photoPath"]) {

         if (data["username"] != toPerson) {
            //Kendi mesajı
            isMyMessageControl = true;

            messageElement.setAttribute("class", "message altAlta");
            messageElement.innerHTML = `
             <div id="ilkIkisi">
                      <div class="userOfMessage greenColor">${data["username"]}: </div>
    
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
      // comment


      // Sadece fotoğraf varsa
      else if (!data["message"] && data["photoPath"]) {

         if (data["username"] != toPerson) {
            //Kendi mesajı
            isMyMessageControl = true;

            messageElement.setAttribute("class", "message altAlta");
            messageElement.innerHTML = `
                <div id="ilkIkisi">
                      <div class="userOfMessage greenColor">${data["username"]}: </div>
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


      // Sadece mesaj varsa
      else {
         if (data["username"] != toPerson) {
            //Kendi mesajı
            isMyMessageControl = true;
            if (data["myMessage"]) {
               messageElement.setAttribute("class", "message");
               messageElement.innerHTML = `
                  <div id="ilkIkisi">
                  <div class="userOfMessage greenColor">${data["username"]}: </div>
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
      if(isMyMessageControl) {
         
      document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
         isMyMessageControl = false;
      }

   }
   // if(flagscroll) {
   //    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight
   //    flagscroll = 0;
   // }
});