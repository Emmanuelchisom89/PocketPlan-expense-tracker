import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
