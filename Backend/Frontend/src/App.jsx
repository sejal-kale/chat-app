import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Left from './home/left/Left'
import Right from './home/right/Right'
import Logout from './home/left1/Logout'
import Signup from './components/signup'
import Login from './components/Login'
import { useAuth } from './context/AuthProvider.jsx'
import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function App() {

  const [authUser, setAuthUser] = useAuth();
  console.log(authUser)
  return (
    <>

      <Routes>
        <Route path="/" element={
          authUser ? (
            <div className="flex h-screen">
              <Logout />
              <Left />
              <Right />
            </div>) : <Navigate to={"/login"} />
        } />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />

      </Routes>


    </>
  )
}

export default App
