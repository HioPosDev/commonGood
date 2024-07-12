import axios from 'axios';
import { useGeneralContext } from '../context/generalContext';
import { useEffect } from 'react';

export const useRegisterInfo = () => {
    const { numberTableHandler, publicVapidKeyHandler, register, registerHandler } = useGeneralContext();

    const requestNotificationPermission = async () => {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Permiso de notificaciones concedido');
            } else {
                console.log('Permiso de notificaciones denegado');
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
        axios.get("https://commongood.hiopos.cloud/npush/getPublicVapid")
            .then(res => {
                console.log('publicvapid -> ', res.data.keys);
                publicVapidKeyHandler(res?.data?.keys ?? '')
            })
            .catch(err => {
                throw new Error(err);
            });
    }, [publicVapidKeyHandler]);

    // Obtener información necesaria para trabajar con el backend
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const table = queryParams.get('table');
        const room = queryParams.get('room');
        numberTableHandler(Number(room), Number(table));
    }, [numberTableHandler, publicVapidKeyHandler, register]);
};
