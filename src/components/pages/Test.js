// import ListaQuestoesAvaliacao from "../lists/ListaQuestoesAvaliacao";
import { useContext, useEffect, useState } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import ConfirmationPopUp from "../modals/ConfirmationPopUp";
import FileCalls from "../../api/FileCalls";
import { TestListsContext } from "../../contexts/TestListsContext";
import TestConfigsForm from "../test/TestConfigsForm";
import TestHeaderForm from "../test/TestHeaderForm";
import QuestionList from "../lists/QuestionList";

const Test = ({ action }) => {

    const { currentEditTest, dispatchCurrentEditTest, currentCreateTest, editInfos, setEditInfos} = useContext(CurrentTestContext);
    const { dispatchTestLists } = useContext(TestListsContext);
    const [ confirmationPopUp, setConfirmationPopUp ] = useState("");

    const isEditMode = action === 'edit';

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

        if(isEditMode && editInfos) {
            fetchTestToEdit();
        }
    }, []);
    
    async function handleSubmit(event) {

        event.preventDefault();

        const fileCalls = new FileCalls('test');

        let testId;

        if(isEditMode) testId = fileCalls.updateFile(currentEditTest, editInfos.testId);
        else testId = fileCalls.createFile(currentCreateTest);

        if(testId.data) {

            if(isEditMode) {
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

                //problema
                //dispatch current edit com valor nulo
            } else {

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
               
            }
            
            setConfirmationPopUp(true);
            console.log(testId.data)
        
        } else if(testId.error){

            console.error(testId.error);
        }
    }

    return (
        <main>
            <section className="visualizando-avaliacao">   
                <h1>Visualização da avaliação</h1>
                <div className="modulo">
                    <div className="lista">
                        {/* <ListaQuestoesAvaliacao /> */}
                    </div>
                </div>
            </section>
            <section className="gerando-avaliacao">
                <h1>Gerando sua avaliação</h1> 
                <div className="modulo">
                    <QuestionList prova={true}/>
                </div>
                <div className="modulo">
                    <TestHeaderForm action={action}/>
                </div>
                <div className="modulo">
                    <TestConfigsForm action={action}/>
                </div>
                <button onClick={(event) => {handleSubmit(event)}}>{action} Avaliaçao</button>      
                {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{type: 'test', action: action}}/>}
            </section>
        </main>
    )
}

export default Test;

