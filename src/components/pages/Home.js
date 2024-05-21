import { useContext } from "react";
import ListaAvaliacoes from "../listas/ListaAvaliacoes";
import { GlobalContext } from "../gerais/Global";
import handleLogin from "../../utils/handleLogin";
import { useEffect } from "react";

const Home = () => {

    const { logado, dispatchLogado } = useContext(GlobalContext);

    //como a home é a url de redirecionamento pos login, procura-se pelo parametro "login_success" para liberar as funcionalidades do app
    useEffect(() => {
        
       if (window.location.search === "?login_success") {
            dispatchLogado({type: 'verificarLogin'});
       } 

    }, []);

    return (  
        <main>
            <p>Seja bem vindo(a)!</p>
            {!logado &&
               <button type="button" className="login" onClick={() => handleLogin()}>Login com Google</button>
            }
            { logado && 
                <div className="modulo" id="avaliacoes">
                    <ListaAvaliacoes />
                </div>
            }
        </main>
    )
}

export default Home;