import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const {token} = useContext(AppContext)
  
  if (!token){
    return <Navigate to="/login" replace />;
  }
  return children 
}

export default ProtectedRoute
