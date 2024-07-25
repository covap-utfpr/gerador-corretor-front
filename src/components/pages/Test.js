// import ListaQuestoesAvaliacao from "../lists/ListaQuestoesAvaliacao";
import ConfirmationPopUp from "../modals/ConfirmationPopUp";
import QuestionList from "../lists/QuestionList";
import HeaderCreate from "../test/HeaderCreate";
import ConfigsCreate from "../test/ConfigsCreate";
import HeaderEdit from "../test/HeaderEdit";
import ConfigsEdit from "../test/ConfigsEdit";
import TestQuestionsList from "../lists/TestQuestionsList";

const Test = ({ action, test, dispatch, handleSubmit, confirmationPopUp, setConfirmationPopUp }) => {
    
    return (
        <main>
            <section className="visualizando-avaliacao">   
                <h1>Visualização da avaliação</h1>
                <div className="modulo">
                    <div className="lista">
                        <TestQuestionsList test={test} dispatch={dispatch}/>
                    </div>
                </div>
            </section>
            <section className="gerando-avaliacao">
                <h1>{action} sua avaliação</h1> 
                <div className="modulo">
                    <QuestionList testType={action}/>
                </div>
                <div className="modulo">
                    {action == 'Criar' ? <HeaderCreate /> : <HeaderEdit />}
                </div>
                <div className="modulo">
                    {action == 'Criar' ? <ConfigsCreate /> : <ConfigsEdit />} 
                </div>
                <button onClick={(event) => {handleSubmit(event)}}>{action} Avaliaçao</button>      
                {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{type: 'test', action: action}}/>}
            </section>
        </main>
    )
}

export default Test;

