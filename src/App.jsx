import { useState } from 'react'
import './App.css'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import DailyLogInput from './pages/DailyLogInput'
import Statistics from './pages/Statistics'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dailylog/create" element={<DailyLogInput />} />
        <Route path="/dailylog/:id" element={<Statistics/>} />
      </Routes>
    </div>
  )
}

export default App
