
import './App.css'
import logo from './logo.svg'
import { AuthProvider } from './components/login/Auth'
import Login from './components/login/Login'

function App() {
  return (
    <AuthProvider>
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Login/>
      </header>
    </div>
    </AuthProvider>
  )
}

export default App
