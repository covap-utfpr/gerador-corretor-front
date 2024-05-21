import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './Global';
import handleLogin from '../../utils/handleLogin';
import { logout } from '../../api/autenticacao';

const Header = () => {

    const { logado, dispatchLogado, dispatchDiretorioRaiz, dispatchListaDisciplinas, dispatchListasQuestoes, dispatchListasAvaliacoes, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const handleLogout = async () => {

        //chama funçao que retorna a url externa para login com google
        const res = await logout();
        
        //se retornou url, redireciona o usuario para fazer login
        if(res.data) { 

            dispatchLogado({type: 'deslogar'});
            dispatchDiretorioRaiz({type: 'deletarStorage'});
            dispatchListaDisciplinas({type: 'deletarStorage'});
            dispatchListasAvaliacoes({type: 'deletarStorage'});
            dispatchListasQuestoes({type: 'deletarStorage'});
            dispatchAvaliacaoAtual({type: 'deletarStorage'});

            console.log("Deslogado");

        } else if(res.error) {

            console.error("Erro ao realizar logout");
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
                {logado && <button className="login" onClick={() => handleLogout()}>Logout</button>}
                {logado && <button className="login" onClick={() => handleLogin()}>Login</button>}
            </nav>
        </header>
    )
}

export default Header;
