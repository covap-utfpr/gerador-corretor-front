import { createContext, useReducer } from "react";
import { CurrentTestStorage } from "../storage/CurrentTestStorage";

const CurrentTestContext = createContext();

const CurrentTestProvider = ({ children }) => {

    const createStorage = new CurrentTestStorage("currentCreateTest");
    const editStorage = new CurrentTestStorage("currentEditTest");

    const [ currentCreateTest, dispatchCurrentCreateTest ] = useReducer(createStorage.reducer, 
        createStorage.getBaseValue());
    const [ currentEditTest, dispatchCurrentEditTest ] = useReducer(editStorage.reducer, 
        editStorage.getBaseValue());

    return(
        <CurrentTestContext.Provider value={{currentCreateTest, dispatchCurrentCreateTest, currentEditTest,dispatchCurrentEditTest}}>
            { children }
        </CurrentTestContext.Provider>
    );
}

export {CurrentTestContext, CurrentTestProvider};