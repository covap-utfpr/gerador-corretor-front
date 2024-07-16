import { useContext, useState } from "react";
import ListsStorage from "../../storage/ListsStorage";
import { TestListsContext } from "../../contexts/TestListsContext";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import DirectoryCalls from "../../api/DirectoryCalls";
import ConfirmationPopUp from "./ConfirmationPopUp";

// props: {id, name}
const DeleteSubjectModal = ({ setDeleteModal, props }) => {

    // Contextos necessarios
    const { testLists, dispatchTestLists  } = useContext(TestListsContext);
    const { questionLists, dispatchQuestionLists } = useContext(QuestionListsContext);

    // Estados necessarios
    const [ confirmationPopUp, setConfirmationPopUp ] = useState(false);

    // Instancionado storages para obter getters
    const questionListsStorage = new ListsStorage("test");
    const testListsStorage = new ListsStorage("question");

    // utilizando getters de quantidade de questoes e avaliacoes
    const questionQnt = questionListsStorage.getQuantity(testLists, props.id);
    const testQnt = testListsStorage.getQuantity(questionLists, props.id);
   
    async function handleDelete() {

        const directoryCalls = new DirectoryCalls();

        const idDeleted = await directoryCalls.deleteDirectory({id: props.id});

        if(idDeleted.data) {


            dispatchTestLists({ type: 'deleteSubject',  payload: props.id });

            dispatchQuestionLists({ type: 'deleteList', payload: props.id });

            // dispatchListasAvaliacoes({ type: 'deleteList', payload: props.id });
            
            // CASTRO
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
            {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{ type: 'subject', action: 'delete' } }/>}
        </div>
    )
}

export default DeleteSubjectModal;