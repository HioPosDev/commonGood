import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {GeneralProvider} from './context/generalContext.tsx'
import OrientationHandler from './components/orientation/orientation.component.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GeneralProvider>
      <OrientationHandler>
        <App />
      </OrientationHandler>
    </GeneralProvider>
  </React.StrictMode>,
)
