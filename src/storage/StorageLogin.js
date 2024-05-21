import Cookies from 'js-cookie';
import StorageAvaliacaoAtual from './StorageAvaliacaoAtual';
import StorageListas from './StorageListas';

class StorageLogin {

    reducer = ( state, action ) => {
    
        switch (action.type) {
    
            case 'atualizarLogin':
                return this.verificarLogin(action)
    
            case 'deslogar':
                return this.deslogar();
    
            default:
                return action;
        }
    }
    
    verificarLogin = () => {

        const token = Cookies.get("token");
        return token ? true : false;
    }

    deslogar = () => {

        Cookies.set("token", "");
        return false;
    }
}

export default StorageLogin;

