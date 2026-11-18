importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDLKngPyi_SWAXEQwdrHO5h8L8OufulAR4",
  authDomain: "doloya-confirmacion.firebaseapp.com",
  projectId: "doloya-confirmacion",
  storageBucket: "doloya-confirmacion.firebasestorage.app",
  messagingSenderId: "832228761099",
  appId: "1:832228761099:web:ddd4b6a0ee0d7f0494b10e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'DoloYa';
  const options = {
    body: payload.notification?.body || '',
    icon: payload.notification?.image || 'Logo-panel.png',
    image: payload.notification?.image || undefined,
    badge: 'Logo-panel.png'
  };
  self.registration.showNotification(title, options);
});
