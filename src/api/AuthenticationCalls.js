import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export default class AuthenticationCalls {
    
    constructor() {
        // url para a rota backend
        this.server = 'http://localhost:8080/';
        // url completa com parametros
        this.url = "";
        // segundo parametro de fetch, definiçao de metodo, headers e body
        this.requestOptions = {
            method: '',
            headers: {
                'Content-Type': '', 
                'Authorization': Cookies.get('token'),
            },
            body: null, 
        };
    }

    //obtém a url para o servidor de autenticaçao da google
    async getLoginUrl() {

        this.url = `${this.server}/login`;
        this.requestOptions.method = 'GET';

        return await this.fetchFunction('text');
    }

    //realiza logout, revogando o token backend
    async logout() {

        this.url = `${this.server}/logout`;
        this.requestOptions.method = 'POST';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        return await this.fetchFunction('text');

    }

    // realiza açao assincrona de chamada de api
    async fetchFunction(responseType) {

        return await resolver(fetch(this.url, this.requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return responseType == 'text' ? res.text(): res.json();
        })
        )
    }
}
