import { useContext, useEffect, useState } from "react";
import { requisitarListas } from "../../utils/requisitarListas";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import { TestListsContext } from "../../contexts/TestListsContext";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import SubjectSelect from "../globals/SubjectSelect";
import ListsStorage from "../../storage/ListsStorage";
import DeleteModal from "../modals/DeleteModal";
import FileCalls from "../../api/FileCalls";

const TestsList = () => {

    // Importando contextos necessarios     
    const { subjectList } = useContext(SubjectListContext);
    const { testLists, dispatchTestLists} = useContext(TestListsContext);
    const { dispatchCurrentEditTest, currentEditTest, dispatchCurrentCreateTest, currentCreateTest, setTestAction } = useContext(CurrentTestContext);

    // Instancia da classe ListsStorage para obter getters de questoes
    const testStorage = new ListsStorage('testLists');

    // Criando estados locais 
    const [ subjectId, setSubjectId] = useState(""); 
    const [ tests, setTests ] = useState([]);
    const [ deleteModal, setDeleteModal ] = useState(false);

    async function fetchTests() {

        // requisita as listas de avaliacoes correspondentes às disciplinas em storage
        const lists = await requisitarListas(subjectList, "avaliacao");

        if(lists) dispatchListasAvaliacoes({type: 'updateStorage', payload: lists})
    }    

    useEffect(() => {
        if (testLists.length === 0) fetchTests();  
    }, []);

    useEffect(() => {

        if (testLists.length !== 0) {

            const list = testStorage.getlist(testLists, subjectId);

            if(list) 
                setTests(list);
            else 
                setTests(false);

        } else {
            setTests(false);
        }

    }, [ subjectId ]);

    function handleSubjectChange(id) {
        setSubjectId(id);
    }

    // marca evento de ediçao e redireciona o usuario para criar-avaliacao
    async function handleEditTest(testId) {

        setTestAction("edit");
        window.location.href = '/editar-avaliacao'
    }

    function handleCreateTest() {

        setTestAction("create");
        dispatchCurrentCreateTest({

        })
    }

    return (
        <div className="lista">
            <h2>Avaliações</h2>
            <SubjectSelect setParentSubject={handleSubjectChange} />
            <ul>
                {tests && tests.map((test, index) => (
                    <li key={index} value={test.name}>
                        <span>{test.name}</span>
                        <button onClick={() => handleEditTest(test.id)}>editar</button>
                        <button onClick={() => setDelete(true)}>excluir</button>
                        { deleteModal && <DeleteModal setDeleteModal={setDeleteModal} props={
                            {
                                subjectId: subjectId,
                                test: test,
                            }
                        }/>}
                    </li>
                ))}
            </ul>           
            <button type="button" onClick={() => handleCreateTest("create")}>Criar nova avaliação</button>
        </div>
    )
}

export default TestsList;