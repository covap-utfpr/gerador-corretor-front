import Cookies from 'js-cookie';

const reducerLogin = ( state, action ) => {
    
    switch (action.type) {

        case 'verificarLogin':
            return  verificarLogin()

        default:
            return state;
    }
}

const verificarLogin = () => {

    const token = Cookies.get("token");
   
    if(token) {
        return true;
    }
    
    return false;
}

export default reducerLogin;

