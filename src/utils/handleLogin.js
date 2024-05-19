import { getUrlLogin } from "../api/autenticacao";

const handleLogin = async () => {

    //chama funçao que retorna a url externa para login com google
    const url = await getUrlLogin();
    
    //se retornou url, redireciona o usuario para fazer login
    if(url.data) { 
        
        window.location.href = url.data;

    } else if(url.error) {

        console.error(url.error);
    } 
    
}

export default handleLogin;