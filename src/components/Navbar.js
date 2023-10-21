import { Link } from 'react-router-dom';
import { getUrlLogin } from '../api/autenticacao';

const Navbar = () => {

    async function handleLogin() {

        const response = await getUrlLogin();
        
        if(response.data) { 

            window.location.href = response.data;

        } else if(response.error) {

            console.error(response.error);
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