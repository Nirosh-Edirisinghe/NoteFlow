import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    <ToastContainer />
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
