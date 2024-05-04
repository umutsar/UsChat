
const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    console.log("Istek yapiliyor...")
    const permission = await Notification.requestPermission();
    console.log(permission)
    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    }
    else {
        console.log("Basarili.")
    }
}

const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
}

setTimeout(() => {
    main()
}, 1000);