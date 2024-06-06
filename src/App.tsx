import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NotificationComponent from './components/notification-component/notification.component'

function App() {

  const arrayValues = [
    {
      name: 'primer plato',
      state: '1'
    },
    {
      name: 'segundo plato',
      state: '1'
    },
    {
      name: 'postre',
      state: '1'
    },
    {
      name: 'ron cola',
      state: '1'
    }
  ]

  return (
    <div className='app-container'>
      <h1>Common Good</h1>
      <h2>Mesa 1</h2>
      <div className="card">
        {arrayValues.map(({name, state}) => {
          return (
            <div className='article'>
              <span>Name: {name}</span>
              <span>State: {state}</span>
            </div>
          )
        })}
      </div>
      <NotificationComponent />
      <footer className="read-the-docs">
        Developed by HioPos Cloudservices
      </footer>
    </div>
  )
}

export default App
