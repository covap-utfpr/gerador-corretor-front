import { useContext, useState } from "react";
import ListsStorage from "../../storage/ListsStorage";
import { TestListsContext } from "../../contexts/TestListsContext";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import DirectoryCalls from "../../api/DirectoryCalls";
import ConfirmationPopUp from "./ConfirmationPopUp";
import { SubjectListContext } from "../../contexts/SubjectListContex";

// props: {id, name}
const DeleteSubject = ({ setDeleteModal, props }) => {
    // Contextos necessarios
    const { testLists, dispatchTestLists  } = useContext(TestListsContext);
    const { questionLists, dispatchQuestionLists } = useContext(QuestionListsContext);
    const { dispatchSubjectList } = useContext(SubjectListContext);

    // Estados necessarios
    const [ confirmationPopUp, setConfirmationPopUp ] = useState(false);

    // Instancionado storages para obter getters
    const questionListsStorage = new ListsStorage("test");
    const testListsStorage = new ListsStorage("question");

    // utilizando getters de quantidade de questoes e avaliacoes
    const questionQnt = questionListsStorage.getQuantity(questionLists, props.id);
    const testQnt = testListsStorage.getQuantity(testLists, props.id);

    async function handleDelete() {

        const directoryCalls = new DirectoryCalls();

        const idDeleted = await directoryCalls.deleteDirectory({id: props.id});

        if(idDeleted.data) {
            dispatchSubjectList({type: 'deleteSubject', payload: props.id})
            dispatchTestLists({ type: 'deleteList',  payload: props.id });
            dispatchQuestionLists({ type: 'deleteList', payload: props.id });

            // dispatchListasAvaliacoes({ type: 'deleteList', payload: props.id });
            
            // incluir
            // dispatchAvaliacaoAtual( 
            //     {
            //         type: 'excluirQuestoesDisciplina',
            //         payload: id
            //     }
            // );

            setConfirmationPopUp(true);
            setDeleteModal(false);

        } else if(idDeleted.error) {

            console.error(idDeleted.error);
            setDeleteModal(false);
        }
    }

    return (
        <div className="modal">
            <p> Tem certeza que deseja excluir a disciplina {props.name}? Esta disciplina tem mais de {questionQnt} questões e {testQnt} avaliações que serão excluídas!</p>
            <button type="button" onClick={() => handleDelete()}>Excluir</button>
            <button type="button" onClick={() => setDeleteModal(false)}>Cancelar</button>
            {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{ type: 'subject', action: 'Deletar' } }/>}
        </div>
    )
}

export default DeleteSubject;