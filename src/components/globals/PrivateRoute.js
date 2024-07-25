import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';

//recebe componentes filhos
const PrivateRoute = ({ children }) => {
   
    const { logged, rootDirectoryId } = useContext(LoginContext);
    
    //verifica estado de login 
    return (logged && rootDirectoryId ? children : <Navigate to="/" replace />);
};

export default PrivateRoute;
