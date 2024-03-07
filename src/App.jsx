import { useState } from 'react'
import './App.css'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import DailyLogInput from './pages/DailyLogInput'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dailylog" element={<DailyLogInput />} />
      </Routes>
    </div>
  )
}

export default App
