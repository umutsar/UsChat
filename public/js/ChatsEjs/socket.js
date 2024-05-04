

const socket = io();


socket.on("connect", () => {
   socket.emit("getInitialChats");
});


socket.on("initialChats", (sondanSilData) => {
   let silinecekler = document.querySelectorAll(".message");
   silinecekler[silinecekler.length - 1].remove();

   for (let i = 1; i <= sondanSilData; i++) {
      silinecekler[silinecekler.length - i].remove();
   }
});