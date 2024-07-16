import Cookies from 'js-cookie';

class LoginStorage {

    reducer = ( state, action ) => {
    
        switch (action.type) {
    
            case 'updateLogin':
                return this.updateLogin(action)
    
            case 'logout':
                return this.logout();
    
            default:
                return action;
        }
    }
    
    updateLogin = () => {

        const token = Cookies.get("token");
        return token ? true : false;
    }

    logout = () => {

        Cookies.set("token", "");
        return false;
    }
}

export default LoginStorage;

