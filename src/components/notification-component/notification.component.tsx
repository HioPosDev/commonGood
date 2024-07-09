import React, {useState} from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useGeneralContext } from '../../context/generalContext';
import './notification.component.css'

const NotificationComponent: React.FC = () => {
  const { register, setIsRegistered, tableNumber, publicVapidKey } = useGeneralContext();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

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
    setIsLoading(true);
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker no está soportado en este navegador.');
      setIsLoading(false);
      return;
    }

    if(tableNumber && publicVapidKey && register) {
      try {
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });

        axios.post(`https://commongood.hiopos.cloud/npush/subscribe?table=${tableNumber}`, subscription, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log(response.data);
          setIsRegistered(true);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
        console.log('Usuario suscrito:', subscription);
      } catch (error) {
        console.error('Error al suscribir al usuario:', error);
        setIsLoading(false);
      }
    }

  };

  return (
    <div>

      {isLoading && (
        <ClipLoader
        size={50}
        color={"#123abc"}
        loading={isLoading}
        />
      )}

      {!isLoading && (
        <button id="subscribeButton" onClick={subscribeUser}>
          ASIGNAR MESA
        </button>
      )}

    </div>
  );
};

export default NotificationComponent;
