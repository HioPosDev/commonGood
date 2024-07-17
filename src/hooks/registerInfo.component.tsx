import axios from 'axios';
import { useGeneralContext } from '../context/generalContext';
import { useEffect } from 'react';

export const useRegisterInfo = () => {
    const { numberTableHandler, publicVapidKeyHandler, register, registerHandler, setiOSDevice, iOSDevice } = useGeneralContext();

    const requestNotificationPermission = async () => {
        if(!iOSDevice){
            if ('Notification' in window && 'serviceWorker' in navigator) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Permiso de notificaciones concedido');
                } else {
                    console.log('Permiso de notificaciones denegado');
                }
            } else {
                console.error("Can not accept notifications");
            }
        }
    };

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const swPath = './sw.js';
            navigator.serviceWorker.register(swPath)
                .then(registration => {
                    registerHandler(registration);
                    console.log('Service Worker registrado:', registration);

                    requestNotificationPermission();
                })
                .catch(error => {
                    console.error('Error al registrar el Service Worker:', error);
                });
        }
    }, [register, registerHandler]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}getPublicVapid`)
            .then(res => {
                publicVapidKeyHandler(res?.data?.keys ?? '');
            })
            .catch(err => {
                throw new Error(err);
            });
    }, [publicVapidKeyHandler]);

    // Obtener información necesaria para trabajar con el backend
    useEffect(() => {
        setiOSDevice(/iPad|iPhone|iPod/.test(navigator.userAgent));
        const queryParams = new URLSearchParams(window.location.search);
        const table = queryParams.get('table');
        const room = queryParams.get('room');
        numberTableHandler(Number(room), Number(table));
    }, [numberTableHandler, publicVapidKeyHandler, register]);

};
