import React from 'react';
import {Navigate} from "react-router-dom";
import './ProtectedRoute.css'

function ProtectedRoute({children, allowedRoles}) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('user');
    if(!token) {
        return <Navigate to="/login" replace={true}/>;
    }
    if(allowedRoles &&!allowedRoles.includes(userRole)) {
        switch (userRole) {
            case 'admin':
                return <Navigate to="/admin/home" replace={true}/>;
            case 'faculty':
                return <Navigate to="/faculty/home" replace={true}/>;
            case 'student':
                return <Navigate to="/student/home" replace={true}/>;
            default:
                return <Navigate to="/login" replace={true}/>;
        }
    }
    return children;
}

export default ProtectedRoute;