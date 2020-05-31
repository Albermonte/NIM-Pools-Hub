if (!("Notification" in window)) {
    console.warn('No Notification API')
}
// Let's check whether notification permissions have already been granted
else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    /* var notification = new Notification("Hi there!"); */
}
// Otherwise, we need to ask the user for permission
else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            const options = {
                body: 'We will notify you when payouts are received on your address',
                icon: '/nimpoolshub.png'
            }
            try {
                var notification = new Notification('NIM Pools Hub', options);
            } catch (err) {
                console.log('Notification API error: ' + err);
            }
        }
    });
}