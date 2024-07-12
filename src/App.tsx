import './App.css';
import NotificationComponent from './components/notification/notification.component';
import ProductsList from './components/products/products.component';
import { useGeneralContext } from './context/generalContext';
import { useRegisterInfo } from './hooks/registerInfo.component';

function App() {
  useRegisterInfo();
  const { tableNumber, isRegitered, register, publicVapidKey, roomNumber } = useGeneralContext();

  const compareStatusDate = () => tableNumber && register && isRegitered && publicVapidKey;

  return (
    <div className='app-container'>
      <h1>
         <img loading="lazy" decoding="async" width="403" height="401" src="https://common-good.es/wp-content/uploads/2024/05/logo-common-goood.png" alt="" title="logo-common-goood" srcSet="https://common-good.es/wp-content/uploads/2024/05/logo-common-goood.png 403w, https://common-good.es/wp-content/uploads/2024/05/logo-common-goood-300x300.png 300w, https://common-good.es/wp-content/uploads/2024/05/logo-common-goood-150x150.png 150w" sizes="(max-width: 403px) 100vw, 403px" className="logo"/>
      </h1>
      <div className='table-title'>
        <span className='table-name'>Sala: {roomNumber}</span>
        <span className='table-name'>Mesa: {tableNumber}</span>
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
     {/* <footer className="read-the-docs">
              Developed by HioPos Cloudservices
            </footer> */}
    </div>
  );
}

export default App;
