import { createContext, useReducer } from "react";
import SubjectListStorage from "../storage/SubjectListStorage";

const SubjectListContext = createContext();

const SubjectListProvider = ({ children }) => {

    const subjectListStorage = new SubjectListStorage();

    const [ subjectList, dispatchsubjectList ] = useReducer(subjectListStorage.reducer, 
        subjectListStorage.getBaseValue());

    return(
        <SubjectListContext.Provider value={{subjectList, dispatchsubjectList}}>
            { children }
        </SubjectListContext.Provider>
    );
}

export { SubjectListContext, SubjectListProvider };