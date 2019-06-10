importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: '622914864864',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'You have new notification from Salon!';
  const notificationOptions = {
    body: payload.data.body,
    icon: 'notification.png',
    click_action: 'https://test-app-59413.firebaseapp.com',
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
