import { useEffect, useContext } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { TestListsContext } from "../../contexts/TestListsContext";
import { LoginContext } from "../../contexts/LoginContext";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import DirectoryCalls from "../../api/DirectoryCalls";

// Recebe função de atualização do state do componente pai
const SubjectSelect = ({ setParentSubject }) => {

    //Importando contextos necessarios
    const { subjectList, dispatchSubjectList } = useContext(SubjectListContext);
    const { rootDirectoryId } = useContext(LoginContext)
    const { questionLists } = useContext(QuestionListsContext);
    const { testLists } = useContext(TestListsContext);

    // Funcao para requisitar lista de disciplinas da API
    async function fetchSubjects() {

        const dirCalls = new DirectoryCalls();
        
        const list = await dirCalls.readDirectories({parentId: rootDirectoryId, start: 0});

        if(list.data) {
            
            dispatchSubjectList({type:'updateStorage', payload: list.data});
    
        } else if (list.error) {
    
            console.error(list.error);
        }   
    }

    // A cada recarregamento do componente, verifica tamanho da lista no storage
    useEffect(() => {
        
        if(subjectList.length === 0) fetchSubjects();
        
    }, [ rootDirectoryId ]);

    // Se a lista de questoes for modificada, o select atualiza para o primeiro item da lista 
    useEffect(() => {
        
        if(questionLists.length !== 0) {
            setParentSubject(questionLists[0].subjectId);
        } else {
            setParentSubject(false);
        }

    }, [questionLists]);

    // Se a lista de avaliacoes for modificada, o select atualiza para o primeiro item da lista 
    useEffect(() => {
        
        if(testLists.length !== 0) {
            setParentSubject(testLists[0].subjectId);
        } else {
            setParentSubject(false);
        }

    }, [testLists]);

    return (
        <div className="select-disciplinas">
            <h3>Disciplina</h3>
            <select name="disciplinas" onChange={(event) => { setParentSubject(event.target.value) }}>
                {subjectList.map((subject, index) => (
                    <option key={index} value={subject.id}>
                        {subject.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SubjectSelect;

