import './App.css';
import NotificationComponent from './components/notification-component/notification.component';
import { useGeneralContext } from './context/generalContext';
import { useRegisterInfo } from './hooks/registerInfo.component';

function App() {
  useRegisterInfo();
  const { tableNumber, isRegitered, register, publicVapidKey } = useGeneralContext();

  const compareStatusDate = () => tableNumber && register && isRegitered && publicVapidKey;

  const arrayValues = [
    { name: 'primer plato', state: '1' },
    { name: 'segundo plato', state: '1' },
    { name: 'postre', state: '1' },
    { name: 'ron cola', state: '1' }
  ];

  return (
    <div className='app-container'>
      <h1>Common Good</h1>
      <div className='table-title'>
        <span className='table-name'>Mesa</span>
        <span className='table-number'>{tableNumber}</span>
      </div>
     {
      compareStatusDate() ? (
          <div>
            <div className="card">
              {arrayValues.map(({ name, state }, index) => (
                <div className='article' key={index}>
                  <span>Name: {name}</span>
                  <span>State: {state}</span>
                </div>
              ))}
            </div>
            <footer className="read-the-docs">
              Developed by HioPos Cloudservices
            </footer>
        </div>
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
