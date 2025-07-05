import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contacts from './pages/Contacts'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  )
}

export default App
