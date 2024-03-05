import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from './Global';

//componente rota privada recebe verificador de autenticaçao e componentes filhos
const RotaPrivada = ({ children }) => {
   
    const { logado, idDiretorioRaiz } = useContext(GlobalContext);

    return (logado && idDiretorioRaiz ? children : <Navigate to="/" replace />);
};

export default RotaPrivada;
