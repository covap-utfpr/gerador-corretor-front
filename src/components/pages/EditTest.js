import { useContext, useEffect, useState } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import FileCalls from "../../api/FileCalls";
import { TestListsContext } from "../../contexts/TestListsContext";

import Test from "./Test";

const EditTest = () => {

    const { currentEditTest, dispatchCurrentEditTest, editInfos, setEditInfos} = useContext(CurrentTestContext);
    const { dispatchTestLists } = useContext(TestListsContext);
    const [ confirmationPopUp, setConfirmationPopUp ] = useState("");

    async function fetchTestToEdit() {

        const fileCalls = new FileCalls('test');

        const retTest = await fileCalls.readFile({id: editInfos.testId});

        if(retTest.data) {

            dispatchCurrentEditTest({
                type: 'updateStorage',
                payload: retTest.data
            });

            setEditInfos("");
            
        } else if(retTest.error) {

            console.log(retTest.error)
            setEditInfos("");
        }

    }

    useEffect(() => {

        if(editInfos) {
            fetchTestToEdit();
        }
    }, []);
    
    async function handleSubmit(event) {

        event.preventDefault();

        const fileCalls = new FileCalls('test');

        let testId = fileCalls.updateFile(currentEditTest, editInfos.testId);

        if(testId.data) {

            dispatchTestLists({
                type: 'updateListElement', 
                payload: { 
                    subjectId: currentEditTest.header.subject, 
                    element: {
                        name: currentEditTest.header.title, 
                        id: testId.data
                    }
                }
            });
            
            setConfirmationPopUp(true);
            console.log(testId.data)
        
        } else if(testId.error){

            console.error(testId.error);
        }
    }
    
    return (
        <Test action={'Editar'}
            test={currentEditTest}
            dispatch={dispatchCurrentEditTest}
            handleSubmit = {handleSubmit}
            confirmationPopUp = {confirmationPopUp}
            setConfirmationPopUp = {setConfirmationPopUp}
        />
    )
}

export default EditTest;

