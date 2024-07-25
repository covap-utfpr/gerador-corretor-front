import { useContext, useEffect, useState } from "react";
import requestLists from "../../utils/requestLists";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import ListsStorage from "../../storage/ListsStorage";
import DeleteModal from "../modals/DeleteModal";
import TestQuestion from "../../models/TestQuestion";
import SubjectSelect from "../globals/SubjectSelect";
import CreateQuestion from "../modals/CreateQuestion";
import EditQuestion from "../modals/EditQuestion";
    
const QuestionList = ( { testType }) => {

    // Importando contextos necessarios     
    const { subjectList } = useContext(SubjectListContext);
    const { questionLists, dispatchQuestionLists} = useContext(QuestionListsContext);
    const { dispatchCurrentCreateTest, dispatchCurrentEditTest } = useContext(CurrentTestContext);

    // Instancia da classe ListsStorage para obter getters de questoes
    const questionStorage = new ListsStorage('questionLists');
    
    const [ subjectId, setSubjectId] = useState(""); 
    const [ questions, setQuestions ] = useState([]);
    const [ editModal, setEditModal ] = useState(false);
    const [ createModal, setCreateModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);

    async function fetchQuestions() {

        // requisita as listas de questoes correspondentes às disciplinas em storage
        const lists = await requestLists(subjectList, "question");
        if(lists) dispatchQuestionLists({type: 'updateStorage', payload: lists})
    }    

    useEffect(() => {
        if (questionLists.length === 0) fetchQuestions();  
    }, []);


    useEffect(() => {

        if (questionLists.length !== 0) {

            const list = questionStorage.getlist(questionLists, subjectId);

            if(list) 
                setQuestions(list);
            else 
                setQuestions(false);

        } else {
            setQuestions(false);
        }

    }, [ subjectId ])

    function handleSubjectChange(id) {
        setSubjectId(id);
    }

    function handleCurrentTest(subjectId, question) {
        
        let options = {   
            type: 'addQuestion', 
            payload: new TestQuestion(subjectId, question.id, question.name, "", 0, 0)
        }

        if(testType === "Criar") {
            dispatchCurrentCreateTest(options);
            return;
        }

        dispatchCurrentEditTest(options);
    }

    return (
        <div className="lista">
            <h2>Questões {testType && "Disponiveis"}</h2>
            <SubjectSelect setParentSubject={handleSubjectChange} />
            <ul>
                {questions && questions.map((question, index) => (
                    <li key={index} value={question.name}>
                        <span>{question.name}</span>
                        {testType && <button onClick={() => handleCurrentTest(subjectId, question)}>+</button>}
                        <button onClick={() => setDeleteModal(true)}>excluir</button>
                        <button onClick={() => setEditModal(true)}>editar</button>
                        { deleteModal && <DeleteModal setDeleteModal={setDeleteModal} props={{ subjectId: subjectId, element:question, type:"question"}}/>}
                        { editModal && <EditQuestion setQuestionModal={setEditModal} id={question.id}/>}
                    </li>
                ))}
            </ul>
            <button onClick={() => setCreateModal(true)}>Criar nova questão</button>
            {createModal && <CreateQuestion setQuestionModal={setCreateModal}/>}
        </div>

    )
}

export default QuestionList;