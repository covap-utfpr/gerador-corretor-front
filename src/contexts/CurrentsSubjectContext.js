import { createContext, useReducer } from "react";
import CurrentQuestionStorage from "../storage/CurrentQuestionStorage";

const CurrentSubjectContext = createContext();

const CurrentQuestionProvider = ({ children }) => {

    const createStorage = new CurrentQuestionStorage("currentCreateQuestion");
    const editStorage = new CurrentQuestionStorage("currentEditQuestion");

    const [ currentCreateQuestion, dispatchCurrentCreateQuestion ] = useReducer(createStorage.reducer, 
        createStorage.getBaseValue());
    const [ currentEditQuestion, dispatchCurrentEditQuestion ] = useReducer(editStorage.reducer, 
        editStorage.getBaseValue());

    return(
        <CurrentSubjectContext.Provider value={{currentCreateQuestion, dispatchCurrentCreateQuestion, currentEditQuestion, dispatchCurrentEditQuestion}}>
            { children }
        </CurrentSubjectContext.Provider>
    );
}

export {CurrentSubjectContext, CurrentQuestionProvider};