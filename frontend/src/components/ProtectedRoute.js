import React from 'react';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  const { loggedIn } = useContext(AppContext);
  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRouteElement;
