import { useContext } from "react";
import TestList from "../lists/TestList";
import { useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import AuthenticationCalls from "../../api/AuthenticationCalls";

const Home = () => {

    const { logged, dispatchLogged } = useContext(LoginContext);

    async function handleLogin() {

        const authCalls = new AuthenticationCalls();

        const googleUrl = await authCalls.getLoginUrl();

        if(googleUrl.data) {
            window.location.href = googleUrl.data;
        } else if (googleUrl.error) {
            console.log(googleUrl.error);
        }
    }
    //como a home é a url de redirecionamento pos login, procura-se pelo parametro "login_success" para liberar as funcionalidades do app
    useEffect(() => {
        
       if (window.location.search === "?login_success") dispatchLogged({type: 'updateLogin'});
    }, []);

    return (  
        <main>
            <p>Seja bem vindo(a)!</p>
            {!logged &&
               <button type="button" className="login" onClick={() => handleLogin()}>Login com Google</button>
            }
            { logged && 
                <div className="modulo" id="avaliacoes">
                    <TestList />
                </div>
            }
        </main>
    )
}

export default Home;