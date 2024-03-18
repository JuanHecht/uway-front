/* import { useState } from 'react'
import './App.css'
import Homepage from './pages/Homepage'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import DailyLogInput from './pages/DailyLogInput'
import Statistics from './pages/Statistics'
import DailyLogEdit from './pages/DailyLogEdit'
import Goals from './pages/Goals'
import IsPrivate from './components/IsPrivate'
import { Routes, Route } from 'react-router-dom'
import BottomNavBar from './components/BottomNavbar'
import Landing from './pages/Landing'

function App() {

  return (
    <div>
      <Routes>
        <Route  path='/' element={<Landing />}/>
        <Route path='/home' element={<IsPrivate><Homepage /></IsPrivate>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile"element={ <IsPrivate> <Profile/> </IsPrivate> } />
        <Route path="/dailylog/create" element={<IsPrivate><DailyLogInput /> </IsPrivate>} />
        <Route path="/dailylog/id" element={<IsPrivate><Statistics /></IsPrivate>} />
        <Route path="/dailylogedit/:id" element={<IsPrivate><DailyLogEdit /></IsPrivate>} />
        <Route path="/goals" element={<IsPrivate><Goals/></IsPrivate>} />
        
      </Routes>
      <BottomNavBar/>
    </div>
  )
}

export default App;
 */
import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import DailyLogInput from './pages/DailyLogInput'
import Statistics from './pages/Statistics'
import DailyLogEdit from './pages/DailyLogEdit'
import Goals from './pages/Goals'
/* import MonthlyLog from './pages/MonthlyLog' */
import IsPrivate from './components/IsPrivate'
import BottomNavBar from './components/BottomNavbar'
import Landing from './pages/Landing'

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<IsPrivate><Homepage /></IsPrivate>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<IsPrivate><Profile/></IsPrivate>} />
        <Route path="/dailylog/create" element={<IsPrivate><DailyLogInput /></IsPrivate>} />
        <Route path="/dailylog/id" element={<IsPrivate><Statistics /></IsPrivate>} />
        <Route path="/dailylogedit/:id" element={<IsPrivate><DailyLogEdit /></IsPrivate>} />
        <Route path="/goals" element={<IsPrivate><Goals/></IsPrivate>} />
        {/* <Route path="/monthlylog" element={<IsPrivate><MonthlyLog/></IsPrivate>} /> */}
      </Routes>
      {!isLandingPage && !isAuthPage && <BottomNavBar />}
    </div>
  )
}

export default App;
