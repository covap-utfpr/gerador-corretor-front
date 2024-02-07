import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUrlLogin } from '../../api/autenticacao';
import { GlobalContext } from './Global';

const Header = () => {

    const { logado } = useContext(GlobalContext);

    //ao clicar no botao login
    async function handleLogin() {

        //chama funçao que retorna a url externa para login com google
        const url = await getUrlLogin();
        
        //se retornou url, redireciona o usuario para fazer login
        if(url.data) { 
            
            window.location.href = url.data;

        } else if(url.error) {

            console.error(url.error);
        } 
        
    }

   
    return (
        <header className="header">
            <Link id='title' to="/"><img id='logo' src="logo.png" alt="" /><h1>Gerador e Corretor de Avaliações</h1></Link>
            <nav className="navbar">
                { logado && <Link to="criar-avaliacao">Nova avaliação</Link> }
                { logado && <Link to="editar">Editar</Link> }
                { logado && <Link to="corretor">Corretor</Link> }
                <Link to="sobre">Sobre</Link>
                <button className="login" onClick={() => handleLogin()}>Login</button>
            </nav>
        </header>
    )
}

export default Header;