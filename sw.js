self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Notificación recibida:', data);
  
    const options = {
      body: data.body,
      icon: 'icon.png',
      vibrate: [2000, 500, 2000, 3000, 100, 1000, 300, 1000] // Patron de vibración (milisegundos)
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  