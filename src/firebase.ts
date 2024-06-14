// Importar Firebase y el servicio de mensajería
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVz_fSfBJeZVKTmHvM73UW4MVbCecBUcU",
  authDomain: "commongood-265a8.firebaseapp.com",
  projectId: "commongood-265a8",
  storageBucket: "commongood-265a8.appspot.com",
  messagingSenderId: "544737743303",
  appId: "1:544737743303:web:9b8e96a2a467d7714ac9e2"
};

// Inicializar Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Obtener el servicio de mensajería
const messaging: Messaging = getMessaging(app);

export { messaging };
