import { useContext, useState } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { CurrentQuestionContext } from "../../contexts/CurrentQuestionContext";
import FileCalls from "../../api/FileCalls";
import QuestionModal from "./QuestionModal";

const CreateQuestion = ( { setQuestionModal } ) => {

    const  { currentCreateQuestion, dispatchCurrentCreateQuestion} = useContext(CurrentQuestionContext);
    const  { dispatchQuestionLists } = useContext(QuestionListsContext);
    
    const [ confirmationPopUp, setConfirmationPopUp ] = useState("");

    async function handleSubmit(event) {
        
        event.preventDefault();

        const fileCalls = new FileCalls('question');
        let questionId = await fileCalls.createFile(currentCreateQuestion);

        if(questionId.data) {

            dispatchQuestionLists({
                type: 'addListElement', 
                payload: { 
                    subjectId: currentCreateQuestion.subjectId, 
                    element: {
                        name: currentCreateQuestion.title, 
                        id: questionId.data
                    }
                }
            });
        
            setConfirmationPopUp(true);

            console.log(questionId.data)
        
        } else if(questionId.error){

            console.error(questionId.error);
        }
    }

    return (
       <QuestionModal   type = {"Criar"}
                        question = {currentCreateQuestion}
                        dispatch = {dispatchCurrentCreateQuestion} 
                        handleSubmit = {handleSubmit}
                        confirmationPopUp = {confirmationPopUp}
                        setConfirmationPopUp = {setConfirmationPopUp}
                        setQuestionModal = {setQuestionModal}
        />
    )
}

export default CreateQuestion;