import React, { useEffect, useState } from 'react';

const NotificationComponent: React.FC = () => {

    const [state, setState] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  }, []);

  // Function to show a notification
  const showNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };

  // Function to check the product status
  const checkProductStatus = async () => {
    // const response = await fetch('/api/getProductStatus');
    // const productStatus = await response.json();

    // if (productStatus.state === 'done') {
    //   showNotification('Order Ready', {
    //     body: `Your product ${productStatus.name} is ready!`,
    //   });
    // }

    if (state) {
        console.log('PEREE');
        
        showNotification('Order Ready', {
          body: `Your product is ready!`,
        });
      }
  };

  // Use setInterval to periodically check the product status
  useEffect(() => {
    const intervalId = setInterval(checkProductStatus, 60000); // Check every 60 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (<div>
    <button onClick={() =>  showNotification('Order Ready', {
          body: `Your product is ready!`,
        })}>click</button>
  </div>);
};

export default NotificationComponent;
