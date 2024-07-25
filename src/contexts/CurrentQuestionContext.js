import { createContext, useReducer } from "react";
import CurrentQuestionStorage from "../storage/CurrentQuestionStorage";

const CurrentQuestionContext = createContext();

const CurrentQuestionProvider = ({ children }) => {

    const createStorage = new CurrentQuestionStorage("currentCreateQuestion");
    const editStorage = new CurrentQuestionStorage("currentEditQuestion");

    const [ currentCreateQuestion, dispatchCurrentCreateQuestion ] = useReducer(createStorage.reducer, 
        createStorage.getBaseValue());
    const [ currentEditQuestion, dispatchCurrentEditQuestion ] = useReducer(editStorage.reducer, 
        editStorage.getBaseValue());

    return(
        <CurrentQuestionContext.Provider value={{currentCreateQuestion, dispatchCurrentCreateQuestion, currentEditQuestion, dispatchCurrentEditQuestion}}>
            { children }
        </CurrentQuestionContext.Provider>
    );
}

export {CurrentQuestionContext, CurrentQuestionProvider};