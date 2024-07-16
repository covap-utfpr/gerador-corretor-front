import { useContext, useEffect, useReducer, useState } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { CurrentQuestionContext } from "../../contexts/CurrentQuestionContext";
import FileCalls from "../../api/FileCalls";
import SubjectSelect from "../globals/SubjectSelect";
import ConfirmationPopUp from "./ConfirmationPopUp";

const QuestionModal = ( { setQuestionModal, props} ) => {

    const  { currentCreateQuestion, 
            dispatchCurrentCreateQuestion, 
            currentEditQuestion, 
            dispatchCurrentEditQuestion} = useContext(CurrentQuestionContext);
    const  { dispatchQuestionLists } = useContext(QuestionListsContext);
    
    const [ question, setQuestion ] = useState({});
    const [ confirmationPopUp, setConfirmationPopUp ] = useState("");

    const isEditMode = props.action === 'edit';

    let action;

    if(isEditMode) {
        action = "editar";
        setQuestion(currentEditQuestion);
    } else {
        action = "criar";
        setQuestion(currentCreateQuestion);
    }

    useEffect(() => {
        setQuestion(currentCreateQuestion);
    }, [currentCreateQuestion]);

    useEffect(() => {
        setQuestion(currentEditQuestion);
    }, [currentEditQuestion]);

    async function fetchQuestionToEdit() {

        const fileCalls = new FileCalls('question');

        const retQuestion = await fileCalls.readFile({id: props.id});

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
    
        if(isEditMode) {
            fetchQuestionToEdit();
        }
    }, []);

    async function handleSubmit(event) {
        
        event.preventDefault();

        const fileCalls = new FileCalls('question');

        let questionId;

        if(isEditMode) questionId = await fileCalls.updateFile({question: currentEditQuestion, id: props.id});
        else questionId = await fileCalls.createFile(currentCreateQuestion);

        if(questionId.data) {

            if(isEditMode) {
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

            } else {

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
                //problema
            }
            
            setConfirmationPopUp(true);

            console.log(questionId.data)
        
        } else if(questionId.error){

            console.error(questionId.error);
        }
    }

    //funçao que reseta o state titulo a cada mudança ocorrida no campo
    function handleChange(event, prop) {

        const objChange =   {
            type: 'addSection', 
            payload: {
                section: prop,
                content: event.target.value,
            }
        }
       
        if(isEditMode) dispatchCurrentEditQuestion(objChange);
        else  dispatchCurrentCreateQuestion(objChange);

    }
    function handleSubjectChange(id) {
        
        const objChange =   {
            type: 'addSection', 
            payload: {
                section: "subjectId",
                content: id,
            }
        }
       
        if(isEditMode) dispatchCurrentEditQuestion(objChange);
        else  dispatchCurrentCreateQuestion(objChange);
    }

    function handleAlternativasChange() {

    }

    return (
        <div className="modal">
            
            <h2>{action} Questao</h2>

            <form onSubmit={(event) => handleSubmit(event)}>
                <SubjectSelect setParentSubject={handleSubjectChange}/>               
                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da Questao</label>
                    <input 
                        type="text"
                        name="titulo"
                        id="titulo"
                        value={question.title}
                        required
                        onChange={(event) => handleChange(event, "title")}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="enunciado">Enunciado</label>
                    <textarea 
                        name="enunciado" 
                        id="enunciado" 
                        cols="30" 
                        rows="10"
                        value={question.stem}
                        required
                        onChange={(event) =>  handleChange(event, "enunciado")}
                    ></textarea>
                </div>

                <h3>Alternativas</h3>
                <div className="campo-form">
                    {[...Array(5)].map((el, i) => 
                        <textarea 
                            name="alternativa" 
                            key={`alternativa-${i}`} 
                            id={i} 
                            cols="30" 
                            rows="3"
                            value={question.alternativas[i]}
                            required
                            onChange={(event) => handleAlternativasChange(event)}
                        ></textarea> 
                    )}
                </div>

                <button type="submit">{action}</button>
                <button type="button" className="fechar" onClick={() => {setQuestionModal(false)}}>fechar</button>
                {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{type: 'question', action: props.action}}/>}
            </form>
        </div>
    )
}

export default QuestionModal;