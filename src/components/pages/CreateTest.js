import { useContext, useState } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import FileCalls from "../../api/FileCalls";
import { TestListsContext } from "../../contexts/TestListsContext";

import Test from "./Test";

const CreateTest = () => {

    const { currentCreateTest, dispatchCurrentCreateTest} = useContext(CurrentTestContext);
    const { dispatchTestLists } = useContext(TestListsContext);
    const [ confirmationPopUp, setConfirmationPopUp ] = useState("");
    
    async function handleSubmit(event) {

        event.preventDefault();

        const fileCalls = new FileCalls('test');

        let testId = await fileCalls.createFile(currentCreateTest);

        if(testId.data) {
          
            dispatchTestLists({
                type: 'addListElement', 
                payload: { 
                    subjectId: currentCreateTest.header.subject, 
                    element: {
                        name: currentCreateTest.header.title, 
                        id: testId.data
                    }
                }
            });
            //problema
            //dispatch current create com valor nulo
            
            setConfirmationPopUp(true);
            console.log(testId.data)
        
        } else if(testId.error){

            console.error(testId.error);
        }
    }

    return (
       <Test action={'Criar'}
            test={currentCreateTest}
            dispatch={dispatchCurrentCreateTest}
            handleSubmit = {handleSubmit}
            confirmationPopUp = {confirmationPopUp}
            setConfirmationPopUp = {setConfirmationPopUp}
        />
    )
}

export default CreateTest;

