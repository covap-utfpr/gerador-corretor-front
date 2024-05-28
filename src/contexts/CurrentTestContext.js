import { createContext, useReducer, useState } from "react";
import { CurrentTestStorage } from "../storage/CurrentTestStorage";

const CurrentTestContext = createContext();

const CurrentTestProvider = ({ children }) => {

    const createStorage = new CurrentTestStorage("currentCreateTest");
    const editStorage = new CurrentTestStorage("currentEditTest");

    const [ currentCreateTest, dispatchCurrentCreateTest ] = useReducer(createStorage.reducer, 
        createStorage.getBaseValue());
    const [ currentEditTest, dispatchCurrentEditTest ] = useReducer(editStorage.reducer, 
        editStorage.getBaseValue());
    const [ testAction, setTestAction ] = useState("create");

    return(
        <CurrentTestContext.Provider value={{currentCreateTest, dispatchCurrentCreateTest, currentEditTest, dispatchCurrentEditTest, testAction, setTestAction}}>
            { children }
        </CurrentTestContext.Provider>
    );
}

export {CurrentTestContext, CurrentTestProvider};