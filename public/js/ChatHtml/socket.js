const socket = io();

let count = 0;

let previousDate = "";


/*
socket.on("connect", () => {
   //socket.emit("getInitialMessages");
});
*/


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
      var result = confirm('Evet veya Hayır seçeneklerinden birini seçin.');
      if (result) {
         var buttonValue = event.target.value;

         socket.emit("deleteMessage", buttonValue, toPerson)
      }
   }
});
