import axios from 'axios';
import React, { useEffect } from 'react';
import { useGeneralContext } from '../../context/generalContext';

const publicVapidKey = 'BI2Msr9HxqB9M4fU60Hwcmq2XoaJymfNQ2OAvVQ86XLag1bgzgFEreJNGLZ6PNwRTyzNCVAOrjn9gnZSJH6Pmtg';

const NotificationComponent: React.FC = () => {
  const { registerHandler, register, setIsRegistered } = useGeneralContext();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const swPath = './sw.js';
      navigator.serviceWorker.register(swPath)
        .then(registration => {
          registerHandler(registration)
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
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker no está soportado en este navegador.');
      return;
    }

    try {
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      axios.post('https://4072-2-154-226-93.ngrok-free.app/npush/subscribe?table=23', subscription, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response.data);
        setIsRegistered(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });

      console.log('Usuario suscrito:', subscription);
    } catch (error) {
      console.error('Error al suscribir al usuario:', error);
    }
  };

  return (
    <div>
      <button id="subscribeButton" onClick={subscribeUser}>
        INICIAR PROCESO
      </button>
    </div>
  );
};

export default NotificationComponent;
