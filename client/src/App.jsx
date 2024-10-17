import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Factions from './views/Factions'
import Navbar from './components/Navbar'
import Home from './views/Home'
import DisplayFaction from './views/DisplayFaction';
import AddUnit from './views/AddUnit';
import DisplayOneMini from './views/DisplayOneMini';
import EditUnit from './views/EditUnit';

import './App.css'


function App() {
  const [errors, setErrors] = useState({})

  const errorUpdater = (newErrors) => {
    setErrors((newErrors))
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/factions' element={ <Factions errors={errors} errorUpdater={errorUpdater} />} />
        <Route path='/factions/:id' element={ <DisplayFaction />} />
        <Route path='/factions/:factionId/miniatures/add' element={ <AddUnit errors={errors} errorUpdater={errorUpdater} />} />
        <Route path='/miniatures/:id' element={ <DisplayOneMini />} />
        <Route path='/miniatures/:id/edit' element={ <EditUnit errors={errors} errorUpdater={errorUpdater} />} />
      </Routes>
    </>
  )
}

export default App
