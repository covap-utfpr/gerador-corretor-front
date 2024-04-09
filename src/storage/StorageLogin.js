import Cookies from 'js-cookie';

class StorageLogin {

    reducer = ( state, action ) => {
    
        switch (action.type) {
    
            case 'verificarLogin':
                return this.verificarLogin()
    
            default:
                return state;
        }
    }
    
    verificarLogin = () => {

        const token = Cookies.get("token");
        return token ? true : false;
    }
    
}

export default StorageLogin;

