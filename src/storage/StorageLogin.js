import Cookies from 'js-cookie';

class StorageLogin {

    reducer = ( state, action ) => {
    
        switch (action.type) {
    
            case 'atualizarLogin':
                return this.atualizarLogin(action)
    
            default:
                return action;
        }
    }
    
    atualizarLogin = () => {

        const token = Cookies.get("token");
        return token ? true : false;
    }
}

export default StorageLogin;

