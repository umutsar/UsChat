let fetchChatsFlag = 1;

socket.emit("fetchChats");

socket.on("handlerChats", (data) => {
    if (fetchChatsFlag) {
        document.getElementById("homeScreenItemsUl").innerHTML = "";
        if (data.length == 0) {
            let eachItem = document.createElement("div");
            // eachItem.setAttribute();
            eachItem.innerHTML = `
                <div>Sohbet Başlatın.</div>
            `;
            document.getElementById("homeScreenItemsUl").appendChild(eachItem);
        }

        else if (data && Array.isArray(data)) {

            data.forEach((element) => {
                if (element.lastMessage == '') {
                    element.lastMessage = `[İçerik]`
                }
                let eachItem = document.createElement("li");
                eachItem.setAttribute("data-value", `${element.user}`);

                if(element.isToday) {
                    eachItem.innerHTML = `
                    <div class="usernameDivs">${element.user}</div>
                    <div class="messageSiluetParent">
                        <span class="messageSiluet">${element.lastMessage}</span>
                        <span class="clockInformation">${(element.time).split(":")[0] + ":" + (element.time).split(":")[1]}</span>
                    </div>
                `;
                }
                
                else {
                    eachItem.innerHTML = `
                    <div class="usernameDivs">${element.user}</div>
                    <div class="messageSiluetParent">
                        <span class="messageSiluet">${element.lastMessage}</span>
                        <span class="clockInformation">${element.time}</span>
                    </div>
                `;
                }
                document.getElementById("homeScreenItemsUl").appendChild(eachItem);
            });

            listenChatItems();

            fetchChatsFlag = 0;
        } else {
            console.error("HandlerChats: Geçersiz veri formatı.");
        }
    }
});


socket.on("handleSearchUser", (data) => {
    if (data.length == 0) {
        document.getElementById("homeScreenItemsUl").innerHTML = "";
        let eachItem = document.createElement("div");
        // eachItem.setAttribute();
        eachItem.innerHTML = `
            <div>Kullanıcı bulunamadı.</div>
        `;
        document.getElementById("homeScreenItemsUl").appendChild(eachItem);
    }

    else if (data && Array.isArray(data)) {
        document.getElementById("homeScreenItemsUl").innerHTML = "";

        data.forEach((element) => {
            let eachItem = document.createElement("li");
            eachItem.setAttribute("data-value", `${element.kullaniciadi}`);
            eachItem.setAttribute("class", "yukleniyor");
            eachItem.innerHTML = `
                <div class="usernameDivs">${element.kullaniciadi}</div>
            `;
            document.getElementById("homeScreenItemsUl").appendChild(eachItem);
        });

        listenChatItems();

        fetchChatsFlag = 0;
    } else {
        console.error("HandlerChats: Geçersiz veri formatı.");
    }
})