import { createContext, useReducer } from "react";
import ListsStorage from "../storage/ListsStorage";

const QuestionListsContext = createContext();

const QuestionListsProvider = ({ children }) => {

    const questionListsStorage = new ListsStorage("questionLists");

    const [ questionLists, dispatchQuestionLists ] = useReducer(questionListsStorage.reducer, 
        questionListsStorage.getBaseValue());

    return(
        <QuestionListsContext.Provider value={{questionLists, dispatchQuestionLists}}>
            { children }
        </QuestionListsContext.Provider>
    );
}

export {QuestionListsContext, QuestionListsProvider};