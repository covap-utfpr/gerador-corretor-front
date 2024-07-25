import { useContext, useState } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { TestListsContext } from "../../contexts/TestListsContext";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import { LoginContext } from "../../contexts/LoginContext";
import DirectoryCalls from "../../api/DirectoryCalls";
import FileList from "../../models/FileList";
import ListItem from "../../models/ListItem";
import SubjectModal from "./SubjectModal";

const CreateSubject = ( { setModal } ) => {

    const { rootDirectoryId } = useContext(LoginContext)
    const { dispatchQuestionLists } = useContext(QuestionListsContext);
    const { dispatchTestLists } = useContext(TestListsContext);
    const { dispatchSubjectList } = useContext(SubjectListContext);

    const [ name, setName ] = useState();

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();

        const directoryCalls = new DirectoryCalls();

        let subjectId = await directoryCalls.createDirectory({name: name, parentId: rootDirectoryId});

        if(subjectId) {

            let idQuestionsDir, idTestsDir;

            [ idQuestionsDir, idTestsDir ] = await Promise.all([
                directoryCalls.createDirectory({name:"Questoes", parentId: subjectId.data}),
                directoryCalls.createDirectory({name:"Avaliacoes", parentId: subjectId.data}),
            ]);   

            if(idQuestionsDir.data && idTestsDir.data) {

                dispatchSubjectList( {
                    type: 'addSubject', 
                    payload: new ListItem(subjectId.data, name)
                } );
                
                dispatchQuestionLists( {
                    type: 'addList',
                    payload: new FileList(subjectId.data, 0, []) 
                } )

                dispatchTestLists( {
                    type: 'addList',
                    payload: new FileList(subjectId.data, 0, [])
                } )

            } else if (idQuestionsDir.error || idTestsDir.error) {
        
                console.error("erro ao criar pastas internas");
            }

        } else if (subjectId.error) {

            console.error("Erro ao criar disciplina");
        }
    }

    return (
       <SubjectModal 
        type={"Criar"}
        setModal={setModal}
        setName={setName}
        handleSubmit={handleSubmit} 
       />
    )
}

export default CreateSubject;