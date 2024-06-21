import './App.css';
import NotificationComponent from './components/notification-component/notification.component';
import { useGeneralContext } from './context/generalContext';

function App() {
  const { register, isRegitered } = useGeneralContext();

  const arrayValues = [
    { name: 'primer plato', state: '1' },
    { name: 'segundo plato', state: '1' },
    { name: 'postre', state: '1' },
    { name: 'ron cola', state: '1' }
  ];

  return (
    <div className='app-container'>
      <h1>Common Good</h1>
     {
      register && isRegitered ? (
          <div>
            <h2>Mesa 1</h2>
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
        <NotificationComponent/>
      )
     }
    </div>
  );
}

export default App;
