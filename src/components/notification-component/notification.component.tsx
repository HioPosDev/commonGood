import React, { useEffect, useState } from 'react';

const publicVapidKey = 'BI2Msr9HxqB9M4fU60Hwcmq2XoaJymfNQ2OAvVQ86XLag1bgzgFEreJNGLZ6PNwRTyzNCVAOrjn9gnZSJH6Pmtg';

const NotificationComponent: React.FC = () => {
  const [regist, setRegist] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        const swPath = await findServiceWorkerPath(); // Función para buscar la ruta del Service Worker
        if (swPath) {
          const registration = await navigator.serviceWorker.register(swPath);
          setRegist(registration);
          console.log('Service Worker registrado:', registration);
        } else {
          console.error('No se encontró el Service Worker.');
        }
      } catch (error) {
        console.error('Error al registrar el Service Worker:', error);
      }
    };

    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    } else {
      console.warn('Service Worker no está soportado en este navegador.');
    }
  }, []);

  const findServiceWorkerPath = async (): Promise<string | null> => {
    // Lógica para buscar la ruta del Service Worker dinámicamente
    const possiblePaths = ['./sw.js', '/sw.js', '/path/to/sw.js']; // Agrega las rutas que desees probar

    for (const path of possiblePaths) {
      try {
        await fetch(path);
        return path;
      } catch (error) {
        console.warn(`No se encontró el archivo en la ruta ${path}`);
      }
    }

    return null;
  };

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

    if (!regist) {
      console.warn('Service Worker no registrado aún.');
      return;
    }

    try {
      const subscription = await regist.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      console.log('HELLOOO 3!', subscription);

      await fetch('http://87.106.125.61/npush/subscribe', {
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
