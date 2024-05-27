import { useContext, useEffect, useState } from "react";
import { requisitarListas } from "../../utils/requisitarListas";
import ModalExcluirQuestaoEAvaliacao from "../modais/ModalExcluirQuestaoEAvaliacao";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import { TestListsContext } from "../../contexts/TestListsContext";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import SubjectSelect from "../globals/SubjectSelect";
import { createContext } from "react";

const TestsList = () => {

    // Importando contextos necessarios     
    const { subjectList } = useContext(SubjectListContext);
    const { testLists, dispatchTestLists} = useContext(TestListsContext);
    const { currentEditTest } = useContext(CurrentTestContext);

    // Criando estados locais 
    const [ subjectId, setSubjectId] = useState(""); 
    const [ tests, setTests ] = useState([]);
    const [ delete, setDelete ] = useState(false);

    async function fetchTests() {

        // requisita as listas de avaliacoes correspondentes às disciplinas em storage
        const lists = await requisitarListas(subjectList, "avaliacao");

        if(lists) {
            dispatchListasAvaliacoes({type: 'updateStorage', payload: lists})
        }
    }    

    useEffect(() => {
        if (testLists.length === 0) fetchTests();  
    }, []);

    useEffect(() => {

        if (testLists.length !== 0) {

            const list = storageAvaliacao.getList(testLists, subjectId);

            if(list) {
                setTests(list);
            } else {
                setTests(false);
            }

        } else {
            setTests(false);
        }

    }, [ subjectId ]);

    function handleSubjectChange(id) {
        setSubjectId(id);
    }

    return (
        <div className="lista">
            <h2>Avaliações</h2>
            <SubjectSelect setParentSubject={handleSubjectChange} />
            <ul>
                {tests && tests.map((test, index) => (
                    <li key={index} value={test.name}>
                        <span>{test.name}</span>
                        <button onClick={() => setDelete(true)}>excluir</button>
                        { delete && <ModalExcluirQuestaoEAvaliacao setDelete={setDelete} props={
                            {
                                subjectId: subjectId,
                                test: test,
                            }
                        }/>}
                    </li>
                ))}
            </ul>           
            <button type="button">Criar nova avaliação</button>
        </div>
    )
}

export default TestsList;