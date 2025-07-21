import React, { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'

export const ProtectedRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    console.log({ location });
    
    return (
        isLoggedIn ? <Outlet /> : <Navigate to={`/?redirectTo=${location.pathname}`} />
    )
}
