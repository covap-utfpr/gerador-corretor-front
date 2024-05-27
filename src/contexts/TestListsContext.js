import { createContext, useReducer } from "react";
import ListsStorage from "../storage/ListsStorage";

const TestListsContext = createContext();

const TestListsProvider = ({ children }) => {

    const testListsStorage = new ListsStorage("testLists");

    const [ testLists, dispatchTestLists ] = useReducer(testListsStorage.reducer, 
        testListsStorage.getBaseValue());

    return(
        <TestListsContext.Provider value={{testLists, dispatchTestLists}}>
            { children }
        </TestListsContext.Provider>
    );
}

export {TestListsContext, TestListsProvider};