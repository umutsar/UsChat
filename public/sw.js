
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription) => {
    const response = await fetch('http://localhost:543/save-subscription', {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(subscription)
    })
    console.log("Save subscription is working...")

    return response.json()
}

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BGEV18c5qUAPa51di_CyCgLF9SU9wRoGjKQg-iHSHhNWRNUfmVFDcljla79vwmp4L60YivZdJojVCaLNzCVLLS4")
    })

    const response = await saveSubscription(subscription)
})

self.addEventListener("push", e => {
    let jsonParse = JSON.parse(e.data.text())

    self.registration.showNotification(`${jsonParse.kullanici}`, { body: jsonParse.mesaj })
})

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('http://localhost:543/chat.html') // Yeni pencereyi açmak için istediğiniz URL'yi buraya ekleyin
    );
});