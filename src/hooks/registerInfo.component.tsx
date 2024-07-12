import axios from 'axios';
import { useGeneralContext } from '../context/generalContext';
import { useEffect } from 'react';

export const useRegisterInfo = () => {
    const { numberTableHandler, publicVapidKeyHandler, register, registerHandler } = useGeneralContext();
    
    // Active service worker to get notifications
    useEffect(() => {
        if ('serviceWorker' in navigator) {
          const swPath = './sw.js';
          navigator.serviceWorker.register(swPath)
            .then(registration => {
              registerHandler(registration);
              console.log('Service Worker registrado:', registration);

              // Solicitar permisos para notificaciones
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  console.log('Permiso de notificaciones concedido');
                } else {
                  console.log('Permiso de notificaciones denegado');
                }
              });
            })
            .catch(error => {
              console.error('Error al registrar el Service Worker:', error);
            });
        }
      }, [register, registerHandler]);

    useEffect(() => {
      axios.get("https://commongood.hiopos.cloud/npush/getPublicVapid").then(res => {
        console.log('publicvapid -> ', res.data.keys);
        publicVapidKeyHandler(res?.data?.keys ?? '')
      }).catch(err => {
        throw new Error(err);
      })
    }, [])
    
    // Get needed info to work with backend  
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const table = queryParams.get('table');
        const room = queryParams.get('room');
        numberTableHandler(Number(room), Number(table));
    }, [numberTableHandler, publicVapidKeyHandler, register]);
}
