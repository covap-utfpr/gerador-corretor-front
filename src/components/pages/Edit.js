import QuestionList from "../lists/QuestionList";
import SubjectList from "../lists/SubjectList";
import TestList from "../lists/TestList";

const Edit = () => {

    return (
        <main>
            <div className="modulo" id="disciplinas">
                <SubjectList />
            </div>    
            <div className="modulo" id="questoes">
                <QuestionList />
            </div>
            <div className="modulo" id="avaliacoes">
                <TestList />
            </div>   
            
        </main>   
    )
}

export default Edit;