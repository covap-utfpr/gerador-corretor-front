import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUrlLogin } from '../../api/autenticacao';
import { GlobalContext } from './Global';
import handleLogin from '../../utils/handleLogin';

const Header = () => {

    const { logado } = useContext(GlobalContext);
    
    return (
        <header className="header">
            <Link id='title' to="/"><img id='logo' src="logo.png" alt="" /><h1>Gerador e Corretor de Avaliações</h1></Link>
            <nav className="navbar">
                { logado && <Link to="criar-avaliacao">Nova avaliação</Link> }
                { logado && <Link to="editar">Editar</Link> }
                { logado && <Link to="corretor">Corretor</Link> }
                <Link to="sobre">Sobre</Link>
                {logado && <button className="login" onClick={() => handleLogin()}>Logout</button>}
                {!logado && <button className="login" onClick={() => handleLogin()}>Login</button>}
            </nav>
        </header>
    )
}

export default Header;
