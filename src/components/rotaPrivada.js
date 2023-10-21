import React from 'react';
import { Navigate } from 'react-router-dom';

//componente rota privada recebe verificador de autenticaçao e componentes filhos
const RotaPrivada = ({ isAuthenticated, children }) => {
    
    //se nao estiver autenticado, retornar a home
    if (!isAuthenticated) {
        
        return <Navigate to="/" replace />
    }
    
    //se estiver, renderiza componentes filhos
    return children;
};

export default RotaPrivada;
