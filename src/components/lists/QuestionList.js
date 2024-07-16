import { useContext, useEffect, useState } from "react";
import requestLists from "../../utils/requestLists";
import ModalQuestao from "../modals/QuestionModal";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import ListsStorage from "../../storage/ListsStorage";
import DeleteModal from "../modals/DeleteModal";
import TestQuestion from "../../models/TestQuestion";
    
const QuestionList = ( { test }) => {

    // Importando contextos necessarios     
    const { subjectList } = useContext(SubjectListContext);
    const { questionLists, dispatchQuestionLists} = useContext(QuestionListsContext);
    const { dispatchCurrentCreateTest, dispatchCurrentEditTest } = useContext(CurrentTestContext);

    // Instancia da classe ListsStorage para obter getters de questoes
    const questionStorage = new ListsStorage('questionLists');
    
    // Se valer "editar" ou "criar", ativa o modal Questao para a acao designada
    const [ subjectId, setSubjectId] = useState(""); 
    const [ questions, setQuestions ] = useState([]);
    const [ questionModal, setQuestionModal ] = useState("");
    const [ questionModalProps, setQuestionModalProps ] = useState("");
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

    function handleCurrentCreateTest(subjectId, question) {

        //Problema: pode ser a avaliaçao em ediçao ou  avaliaçao em criaçao
        dispatchCurrentCreateTest(
            {   
                type: 'addQuestion', 
                payload: new TestQuestion(subjectId, question.id, question.name, "", 0, 0)
            }
        );
    }

    function handleQuestionModal(props) {
        setQuestionModalProps(props);
        setQuestionModal(true);
    }

    return (
        <div className="lista">
            <h2>Questões {test && "Disponiveis"}</h2>
            <SubjectSelect setParentSubject={handleSubjectChange} />
            <ul>
                {questions && questions.map((question, index) => (
                    <li key={index} value={question.name}>
                        <span>{question.name}</span>
                        {test && <button onClick={() => handleCurrentCreateTest(subjectId, question)}>+</button>}
                        <button onClick={() => setDeleteModal(true)}>excluir</button>
                        <button onClick={() => handleQuestionModal({action: "edit", id: question.id})}>editar</button>
                        { deleteModal && <DeleteModal setDeleteModal={setDeleteModal} props={{ subjectId: subjectId, question: question}}/>}
                    </li>
                ))}
            </ul>
            <button onClick={() => handleQuestionModal({action: "create", id:""})}>Criar nova questão</button>
            {questionModal && <ModalQuestao setQuestionModal={setQuestionModal} props={questionModalProps}/>}
        </div>
    )
}

export default QuestionList;