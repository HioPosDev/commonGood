import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {GeneralProvider} from './context/generalContext.tsx'
import { registerServiceWorker } from './serviceWorkerRegistration.ts';

registerServiceWorker();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GeneralProvider>
      <App />
    </GeneralProvider>
  </React.StrictMode>,
)
