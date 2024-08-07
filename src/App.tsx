import { useEffect } from 'react';
import './App.css';
import NotificationComponent from './components/notification/notification.component';
import ProductsList from './components/products/products.component';
import { useGeneralContext } from './context/generalContext';
import { useRegisterInfo } from './hooks/registerInfo.component';

function App() {
  useRegisterInfo();
  const { tableNumber, isRegistered, register, publicVapidKey, setNotificationsAccepted } = useGeneralContext();

  const compareStatusDate = () => tableNumber !== 0 && register && isRegistered && publicVapidKey || /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
      setNotificationsAccepted(false);
    }
  }, [])

  return (
    <div className='app-container'>
      <div className={`header-${compareStatusDate() ? '1' : '2'}`}>
        <h1 className={`logo-${compareStatusDate() ? '1' : '2'}`}>
          <img loading="lazy" decoding="async" width="403" height="401" src="https://common-good.es/wp-content/uploads/2024/05/logo-common-goood.png" alt="" title="logo-common-goood" srcSet="https://common-good.es/wp-content/uploads/2024/05/logo-common-goood.png 403w, https://common-good.es/wp-content/uploads/2024/05/logo-common-goood-300x300.png 300w, https://common-good.es/wp-content/uploads/2024/05/logo-common-goood-150x150.png 150w" sizes="(max-width: 403px) 100vw, 403px"/>
        </h1>
        <div className='table-title'>
          <span className='table-name'>Mesa</span>
          <span className={`table-number-${compareStatusDate() ? '1' : '2'}`}>{tableNumber}</span>
        </div>
      </div>
     {
      compareStatusDate() ? (
            <ProductsList />
      ) : (
        <>
          <NotificationComponent />
        </>
      )
     }
    </div>
  );
}

export default App;
