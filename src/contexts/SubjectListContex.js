import { createContext, useReducer } from "react";
import SubjectListStorage from "../storage/SubjectListStorage";

const SubjectListContext = createContext();

const SubjectListProvider = ({ children }) => {

    const subjectListStorage = new SubjectListStorage();

    const [ subjectList, dispatchSubjectList ] = useReducer(subjectListStorage.reducer, 
        subjectListStorage.getBaseValue());

    return(
        <SubjectListContext.Provider value={{subjectList, dispatchSubjectList}}>
            { children }
        </SubjectListContext.Provider>
    );
}

export { SubjectListContext, SubjectListProvider };