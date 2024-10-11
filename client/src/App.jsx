import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Factions from './views/Factions'

import './App.css'

function App() {
  const [errors, setErrors] = useState({})

  const errorUpdater = (newErrors) => {
    setErrors((newErrors))
  }

  return (
    <>
      <Routes>
        <Route path='/' element={ <Login errors={errors} errorUpdater={errorUpdater}/>} />
        <Route path='/register' element={ <Register errors={errors} errorUpdater={errorUpdater}/>} />
        <Route path='/factions' element={ <Factions errors={errors} errorUpdater={errorUpdater} />} />
      </Routes>
    </>
  )
}

export default App
