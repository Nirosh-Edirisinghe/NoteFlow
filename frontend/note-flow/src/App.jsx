import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './auth/ProtectedRoute';
import AppLayout from './layouts/AppLayout';
import AddNote from './pages/AddNote';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Auth />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-note" element={<AddNote />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
