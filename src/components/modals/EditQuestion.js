import { useContext, useEffect, useReducer, useState } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { CurrentQuestionContext } from "../../contexts/CurrentQuestionContext";
import FileCalls from "../../api/FileCalls";
import QuestionModal from "./QuestionModal";

const EditQuestion = ( { setQuestionModal, id } ) => {

    const  { currentEditQuestion, 
            dispatchCurrentEditQuestion} = useContext(CurrentQuestionContext);
    const  { dispatchQuestionLists } = useContext(QuestionListsContext);
    
    const [ confirmationPopUp, setConfirmationPopUp ] = useState("");

    async function fetchQuestionToEdit() {

        const fileCalls = new FileCalls('question');

        const retQuestion = await fileCalls.readFile({id: id});

        if(retQuestion.data) {

            dispatchCurrentEditQuestion({
                type: 'updateStorage',
                payload: retQuestion.data
            });

        } else if(retQuestion.error) {

            console.log(retQuestion.error)
        }
    }

    useEffect(() => {
        fetchQuestionToEdit();
    }, []);

    async function handleSubmit(event) {
        
        event.preventDefault();

        const fileCalls = new FileCalls('question');

        let questionId = await fileCalls.updateFile({question: currentEditQuestion, id: id});

        if(questionId.data) {

            //dispatch current create com valor nulo
            dispatchQuestionLists({
                type: 'updateListElement', 
                payload: { 
                    subjectId: currentEditQuestion.subjectId, 
                    element: {
                        name: currentEditQuestion.title, 
                        id: questionId.data
                    }
                }
            });

            //problema
            //dispatch current edit com valor nulo

    
            setConfirmationPopUp(true);

            console.log(questionId.data)
        
        } else if(questionId.error){

            console.error(questionId.error);
        }
    }

    return (
        <QuestionModal  type = {"Criar"}
                        question = {currentEditQuestion}
                        dispatch = {dispatchCurrentEditQuestion} 
                        handleSubmit = {handleSubmit}
                        confirmationPopUp = {confirmationPopUp}
                        setConfirmationPopUp = {setConfirmationPopUp}
                        setQuestionModal = {setQuestionModal}
        />
    )
}

export default EditQuestion;