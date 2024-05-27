import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import AuthenticationCalls from '../../api/AuthenticationCalls';

const Header = () => {

    const { logged, dispatchLogged } = useContext(LoginContext);

    async function handleLogin() {

        const authCalls = new AuthenticationCalls();

        const googleUrl = authCalls.getLoginUrl();

        if(googleUrl.data) {
            window.location.href = googleUrl.data;
        } else if (googleUrl.error) {
            console.log(googleUrl.error);
        }
    }

    async function handleLogout() {

        const authCalls = new AuthenticationCalls();
        const response = authCalls.logout();
        
        if(response.data) {
            
            console.log("deslogado");
            dispatchLogged({type: 'logout'});

        } else if (response.error) {
            console.log(response.error);
        }
    }
    
    return (
        <header className="header">
            <Link id='title' to="/"><img id='logo' src="logo.png" alt="" /><h1>Gerador e Corretor de Avaliações</h1></Link>
            <nav className="navbar">
                { logged && <Link to="criar-avaliacao">Nova avaliação</Link> }
                { logged && <Link to="editar">Editar</Link> }
                { logged && <Link to="corretor">Corretor</Link> }
                <Link to="sobre">Sobre</Link>
                {logged && <button className="login" onClick={() => handleLogout()}>Logout</button>}
                {logged && <button className="login" onClick={() => handleLogin()}>Login</button>}
            </nav>
        </header>
    )
}

export default Header;
