import { createContext, useReducer } from "react";
import LoginStorage from "../storage/LoginStorage";
import { checarDiretorioRaiz } from "../utils/checarDiretorioRaiz";
import RootDirectoryStorage from "../storage/RootDirectoryStorage";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {

    const loginStorage = new LoginStorage();
    const rootDirectoryStorage = new RootDirectoryStorage();

    const [ logged, dispatchLogged ] = useReducer(loginStorage.reducer, 
        loginStorage.updateLogin());
    const [ rootDirectoryId, dispatchrootDirectoryId ] = useReducer(rootDirectoryStorage.reducer, 
        rootDirectoryStorage.getBaseValue());

    useEffect(() => {

        const verifyRootDirectory = async () => {
            if (logged) {
                try {
                    const directoryId = await checarDiretorioRaiz();
                    dispatchrootDirectoryId({ type: 'updateStorage', payload: directoryId });
                } catch (error) {
                    console.log(error);
                }
            }
        };

        verifyRootDirectory();
    }, []);

    return (
        <LoginContext.Provider value={{logged, dispatchLogged, rootDirectoryId, dispatchrootDirectoryId}}>
            { children }
        </LoginContext.Provider>
    );
}

export {LoginContext, LoginProvider};