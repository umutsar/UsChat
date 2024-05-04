

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    let searchText = searchInput.value.trim(); // Girilen metni alır ve boşlukları temizler

    document.getElementById("homeScreenItemsUl").innerHTML = "";

    let eachItem = document.createElement("div");
    eachItem.setAttribute("class", "yukleniyor");
    eachItem.innerHTML = `
            <div>Yükleniyor...</div>
        `;
    document.getElementById("homeScreenItemsUl").appendChild(eachItem);


    if (searchText == "") {
        setTimeout(() => {
            fetchChatsFlag = 1;
            socket.emit("fetchChats");
        }, 500);

    }
    // Sunucuya socket.emit yapılması
    else {
        socket.emit('searchUser', searchText);
        console.log("input sorgusu atıldı.")
    }
});