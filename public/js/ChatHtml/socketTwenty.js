
socket.on("yirmiMesajiAl", (mesajlar) => {
    if (mesajlar["end"] == 1) {
       console.log("scroll için sona gelindi.")
       endFlag = 1;
    }
    
    mesajlar["mesajlar"].forEach((data) => {
 
       if (data["date"] != previousDate && data != undefined) {
 
          if (mesajlar["currentDate"] == data["date"]) {
             const dateDiv = document.createElement("div");
             dateDiv.setAttribute("class", "dateDiv");
             dateDiv.innerText = "Bugün"
             document.getElementById("messages").insertBefore(dateDiv, messages.firstChild);
          }
          else if (parseInt(data["date"].split(".")[0]) + 1 == parseInt(mesajlar["currentDate"].split(".")[0])) {
             const dateDiv = document.createElement("div");
             dateDiv.setAttribute("class", "dateDiv");
             dateDiv.innerText = "Dün"
             document.getElementById("messages").insertBefore(dateDiv, messages.firstChild);
          }
 
          else {
             const dateDiv = document.createElement("div");
             dateDiv.setAttribute("class", "dateDiv");
             dateDiv.innerText = `${data["date"]}`
             document.getElementById("messages").insertBefore(dateDiv, messages.firstChild);
          }
       }
 
       const messageElement = document.createElement("div");
 
 
       if (data["message"] && data["photoPath"]) {
          if (data["username"] == toPerson) {
             messageElement.setAttribute("class", "message altAlta");
             messageElement.innerHTML = `
                   <div id="ilkIkisi">
                            <div class="userOfMessage greenColor">${data["username"]}: </div>
       
                               <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>
       
                               <div class="onlyMessage">
                                  <span>${data["message"]}</span>
                                  <span class="mesajinSagTarafi">
                                     <span class="timeInformation">${data["time"]}</span>
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
                                     <span class="timeInformation">${data["time"]}</span>
                                  </span>
                            </div>
                   </div>
                `;
          }
       }
 
 
       else if (!data["message"] && data["photoPath"]) {
          if (data["username"] == toPerson) {
             if (mesajlar["kullaniciadi"] == data["username"] || mesajlar["kullaniciadi"] == 'admin') {
                messageElement.setAttribute("class", "message altAlta");
                messageElement.innerHTML = `
                      <div id="ilkIkisi">
                            <div class="userOfMessage greenColor">${data["username"]}: </div>
       
                               <img class="imageURLsOnly" alt="Silinen Fotoğraf" src="${data["photoPath"]}"></img>
       
                            <div class="onlyMessage">
                               <span>${data["message"]}</span>
                               <span class="mesajinSagTarafi">
                                  <span class="timeInformation">${data["time"]}</span>
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
                                  <span class="timeInformation">${data["time"]}</span>
                                  <button class="silButonlari silButonlariResmi" value="${data["count"]}"></button>
                               </span>
                            </div>
                      </div>
                `;
             }
          }
       }
 
 
       // Sadece mesaj Varsa
       else {
            console.log(data["kullaniciadi"], " / ", toPerson)
          if (data["username"] == toPerson) {
             messageElement.setAttribute("class", "message");
             messageElement.innerHTML = `
                   <div id="ilkIkisi">
                   <div class="userOfMessage greenColor">${data["username"]}: </div>
                      <div class="onlyMessage">
                         <span>${data["message"]}</span>
                         <span class="mesajinSagTarafi">
                            <span class="timeInformation">${data["time"]}</span>
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
                            <span class="timeInformation">${data["time"]}</span>
                         </span>
                      </div>
                   </div>
             `;
          }
 
       }
 
       document.getElementById("messages").insertBefore(messageElement, document.getElementById("messages").firstChild);
       previousDate = data["date"]
    });
 })