import { Link } from 'react-router-dom';
import { getUrlLogin } from '../api/autenticacao';
import Cookies from 'js-cookie';
import { checkRootDirectory } from '../utils/checkRootDirectory';

const Header = () => {

    //ao clicar no botao login
    async function handleLogin() {

        //chama funçao que retorna aurl externa para login com google
        const url = await getUrlLogin();
        
        //se retornou url, redireciona o usuario para fazer login
        if(url.data) { 
            
            window.location.href = url.data;

        } else if(url.error) {

            console.error(url.error);
        } 

        //se o login foi bem sucedido, verifica existencia do diretorio raiz do app
        if(Cookies.get("token")) {

            await checkRootDirectory();
        }
        
    }
   
    return (
        <header className="header">
            <Link to="/"><h1>Gerador e Corretor de Avaliações</h1></Link>
            <nav className="navbar">
                <Link to="criar-avaliacao">Nova avaliação</Link>
                <Link to="editar">Editar</Link>
                <Link to="corretor">Corretor</Link>
                <Link to="sobre">Sobre</Link>
                <button className="login" onClick={() => handleLogin()}>Login</button>
            </nav>
        </header>
    )
}

export default Header;