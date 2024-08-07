import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import DeleteSubject from "../modals/DeleteSubject";
import DirectoryCalls from "../../api/DirectoryCalls";
import CreateSubject from "../modals/CreateSubject";

const SubjectList = () => {

    // Contextos necessarios
    const { rootDirectoryId } = useContext(LoginContext)
    const { subjectList, dispatchSubjectList } = useContext(SubjectListContext);

    // States
    const [ createModal, setCreateModal ] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(false);

    async function fetchSubjects() {

        const directoryCalls = new DirectoryCalls();

        const list = await directoryCalls.readDirectories(rootDirectoryId);

        if(list.data) {
            dispatchSubjectList({type:'updateStorage', payload: list.data});
    
        } else if (list.error) {
    
            console.error(list.error);
        }   
    }

    useEffect(() => {
        
        if(subjectList.length === 0) fetchSubjects();
        
    }, [ subjectList, rootDirectoryId ]);
    
    return (
        <div className="lista">
            <h2>Disciplinas</h2>
            <ul>
                {subjectList && subjectList.map((subject, index) => (
                    <li key={index} value={subject.name}>
                        {subject.name}
                        <button onClick={() => setDeleteModal(true)}>excluir</button>
                        { deleteModal && <DeleteSubject setDeleteModal={setDeleteModal} props={subject}/>}
                    </li>
                ))}
            </ul>
            <button onClick={() => setCreateModal(true)}>Criar nova disciplina</button>
            { createModal && <CreateSubject setModal={setCreateModal} />}
        </div>
    )
}

export default SubjectList;