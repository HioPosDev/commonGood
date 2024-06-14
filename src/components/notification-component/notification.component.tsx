import React, { useEffect } from 'react';
import { messaging } from '../../firebase'; // Asegúrate de que este path es correcto
import { getToken, onMessage } from 'firebase/messaging';

const NotificationComponent: React.FC = () => {
  useEffect(() => {
    const requestPermission = async () => {
      try {
        // Pedir permiso para mostrar notificaciones
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');

          // Obtener el token de Firebase
          const currentToken = await getToken(messaging, { vapidKey: 'TU_VAPID_PUBLIC_KEY' });
          if (currentToken) {
            console.log('Token:', currentToken);
            // Enviar este token a tu servidor para suscribir el usuario a las notificaciones
          } else {
            console.log('No se obtuvo token.');
          }
        } else {
          console.log('Unable to get permission to notify.');
        }
      } catch (err) {
        console.log('Error al obtener permiso para notificaciones:', err);
      }
    };

    requestPermission();

    // Manejar mensajes entrantes mientras la aplicación está en primer plano
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
      // Aquí puedes mostrar una notificación personalizada
    });
  }, []);

  return <div>Notificación Configurada</div>;
};

export default NotificationComponent;