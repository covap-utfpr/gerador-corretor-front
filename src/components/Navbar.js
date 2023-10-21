import { Link } from 'react-router-dom';
import { getUrlLogin } from '../api/autenticacao';

const Navbar = () => {

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
    }
   
    return (
        <nav className="navbar">
            <h1>Gerador</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/criar-questao"> Nova Questao</Link>
                 <button onClick={() => handleLogin()}>Login</button>
            </div>
        </nav>
    )
}

export default Navbar;