import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';

//componente rota privada recebe verificador de autenticaçao e componentes filhos
const PrivateRoute = ({ children }) => {
   
    const { logged, rootDirectoryId } = useContext(LoginContext);

    return (logged && rootDirectoryId ? children : <Navigate to="/" replace />);
};

export default PrivateRoute;
