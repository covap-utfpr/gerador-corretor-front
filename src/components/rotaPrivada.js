import React from 'react';
import { Navigate } from 'react-router-dom';

const RotaPrivada = ({ isAuthenticated, children }) => {
    
    if (!isAuthenticated) {
        
        return <Navigate to="/" replace />
    }
    
    return children;
};

export default RotaPrivada;
