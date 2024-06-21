import React, { useEffect, useState } from 'react';

const publicVapidKey = 'BI2Msr9HxqB9M4fU60Hwcmq2XoaJymfNQ2OAvVQ86XLag1bgzgFEreJNGLZ6PNwRTyzNCVAOrjn9gnZSJH6Pmtg';

const NotificationComponent: React.FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [regist, setRegist] = useState<any>();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const swPath = './sw.js';
      navigator.serviceWorker.register(swPath)
        .then(registration => {
          setRegist(registration);
          console.log('Service Worker registrado:', registration);
        })
        .catch(error => {
          console.error('Error al registrar el Service Worker:', error);
        });
    }
  }, []);

  const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeUser = async () => {
    console.log('HELLOOO 1!');

    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker no está soportado en este navegador.');
      return;
    }

    try {
      console.log('HELLOOO 2!');

      const subscription = await regist.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      console.log('HELLOOO 3!', subscription);

      // Utiliza la ruta relativa para la solicitud
      await fetch('/npush/subscribe', {  // <-- Aquí se cambia la URL
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Usuario suscrito:', subscription);
    } catch (error) {
      console.error('Error al suscribir al usuario:', error);
    }
  };

  return (
    <div>
      <button id="subscribeButton" onClick={subscribeUser}>
        Suscribirse a Notificaciones
      </button>
    </div>
  );
};

export default NotificationComponent;
