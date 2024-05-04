
let toPerson;

let pageFlag = 0;


const swichToHomePage = () => {
  document.getElementById("searchInput").value = "";
  previousDate = "";
  document.getElementById("messages").innerHTML = "";
  document.getElementById("homeScreen").style.display = "block";
  document.getElementById("chatScreen").style.display = "none";
  document.getElementById("geriTusuParent").style.display = "none";
  pageFlag = 0;
  fetchChatsFlag = 1;
  socket.emit("fetchChats")
}



const swichToChatsPage = (_value) => {


  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("chatScreen").style.display = "block";
  document.getElementById("geriTusuParent").style.display = "block";
  toPerson = _value;

  socket.emit("getInitialMessages", _value);

  document.getElementById("messageHeader").innerText = `~${toPerson}~`
  pageFlag = 1;
}


const listenChatItems = () => {
  let homeScreenItemsUl = document.querySelector("#homeScreenItems ul");

  let liElements = homeScreenItemsUl.querySelectorAll("li");
  // Bir sohbet odasının içerisine giriş
  liElements.forEach(li => {
    li.addEventListener('click', function () {
      let value = this.dataset.value;
      swichToChatsPage(value);
    });
  });


  // Sohbetlerin olduğu ana sayfa
  document.getElementById("geriTusu").addEventListener("click", () => {
    swichToHomePage();
  })
}



document.addEventListener('keydown', function (event) {
  if (pageFlag) {
    if (event.key === "Escape") {
      swichToHomePage();
    }
  }

});
