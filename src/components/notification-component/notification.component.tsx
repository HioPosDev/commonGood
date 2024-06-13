
const NotificationComponent = () => {
  const askNotificationPermission = async () => {
    if (!("Notification" in window)) {
      console.log("Este navegador no soporta notificaciones.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Permiso para notificaciones concedido.");
    } else {
      console.log("Permiso para notificaciones denegado.");
    }
  };

  const showNotification = () => {
    if (Notification.permission === "granted") {
      const options = {
        body: "Este es el cuerpo de la notificación.",
        icon: "icon.png",
        vibrate: [200, 100, 200]
      };
      const notification = new Notification("¡Nueva Notificación!", options);

      notification.onclick = () => {
        console.log("Notificación clicada.");
        window.focus();
      };
    }
  };

  const triggerVibration = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([1000, 500, 1000, 500, 1000]);
    } else {
      console.log("Este dispositivo no soporta la API de vibración.");
    }
  };

  setTimeout(() => {
    navigator.vibrate([1000, 500, 1000, 500, 1000]);
  }, 10000);
  

  return (
    <div>
      <button onClick={askNotificationPermission}>Pedir Permiso</button>
      <button onClick={showNotification}>Mostrar Notificación</button>
      <button onClick={triggerVibration}>Hacer Vibrar</button>
    </div>
  );
};

export default NotificationComponent;
