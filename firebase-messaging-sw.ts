/// <reference lib="webworker" />

import firebase from "firebase/compat/app";

importScripts('https://www.gstatic.com/firebasejs/9.1.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging-compat.js');

declare const self: ServiceWorkerGlobalScope;

firebase.initializeApp({
  apiKey: "AIzaSyCVz_fSfBJeZVKTmHvM73UW4MVbCecBUcU",
  authDomain: "commongood-265a8.firebaseapp.com",
  projectId: "commongood-265a8",
  storageBucket: "commongood-265a8.appspot.com",
  messagingSenderId: "544737743303",
  appId: "1:544737743303:web:9b8e96a2a467d7714ac9e2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload: firebase.messaging.MessagePayload) => {
  console.log('Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions: NotificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
