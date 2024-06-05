import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {arrayValues.map(({name, state}) => {
          return (
            <div className='article'>
              <p>Name: {name}</p>
              <p>State: {state}</p>
            </div>
          )
        })}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
