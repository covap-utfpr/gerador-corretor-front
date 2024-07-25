import SubjectSelect from "../globals/SubjectSelect";
import ConfirmationPopUp from "./ConfirmationPopUp";

const QuestionModal = ( {   type, 
                            question, 
                            dispatch, 
                            handleSubmit, 
                            confirmationPopUp, 
                            setConfirmationPopUp, 
                            setQuestionModal} ) => {
    //funçao que reseta o state titulo a cada mudança ocorrida no campo

    function handleChange(event, prop) {
            
        dispatch( {
            type: 'addSection', 
            payload: {
                section: prop,
                content: event.target.value,
            }
        });

    }
    function handleSubjectChange(id) {
        
        dispatch({
            type: 'addSection', 
            payload: {
                section: "subjectId",
                content: id,
            }
        });
    }

    function handleAlternativasChange() {

    }
    return (
        <div className="modal">
            
            <h2>{type} Questao</h2>

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
                        onChange={(event) =>  handleChange(event, "stem")}
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
                            value={question.alternatives[i]}
                            required
                            onChange={(event) => handleAlternativasChange(event)}
                        ></textarea> 
                    )}
                </div>

                <button type="submit">{type}</button>
                <button type="button" className="fechar" onClick={() => {setQuestionModal(false)}}>fechar</button>
                {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{type: 'question', action: type}}/>}
            </form>
        </div>
    )
}

export default QuestionModal;