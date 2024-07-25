import { useContext, useState } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { TestListsContext } from "../../contexts/TestListsContext";
import FileCalls from "../../api/FileCalls";
import ConfirmationPopUp from "./ConfirmationPopUp";

//props = {subjectId, test} ou
//props = {subjectId, question }
// question ou test = {id, name}
const DeleteModal = ({ setDeleteModal, props }) => {
    
    // Contextos necessarios
    const { dispatchQuestionLists } = useContext(QuestionListsContext);
    const { dispatchTestLists } = useContext(TestListsContext);

    // Estados necessarios
    const [ confirmationPopUp, setConfirmationPopUp ] = useState(false);

    // Fragmentando props
    const subjectId = props.subjectId;
    // guarda key 'test' ou 'question'
    const type = props.type;
    const element = props.element;

    async function handleDelete() {

        const fileCalls = new FileCalls(type);

        const idDeleted = await fileCalls.deleteFile({id: element.id});

        console.log(idDeleted)
        if(idDeleted.data) {

            const deleteParam = {
                type: 'deleteListElement',
                payload: {
                    subjectId: subjectId,
                    elementId: element.id,
                }
            }

            if(type === 'question') {
                console.log(deleteParam)
                dispatchQuestionLists(deleteParam);
            } else if(type === 'test')
                dispatchTestLists(deleteParam);

            setConfirmationPopUp(true);
            setDeleteModal(false);

        } else if(idDeleted.data) {

            console.error(idDeleted.data);
            setDeleteModal(false);
        }
    }

    return (
        <div className="modal">
            <p> Tem certeza que deseja excluir a {type} {element.name}?</p>
            <button type="button" onClick={() => handleDelete()}>Excluir</button>
            <button type="button" onClick={() => setDeleteModal(false)}>Cancelar</button>
            {confirmationPopUp && <ConfirmationPopUp setConfirmationPopUp={setConfirmationPopUp} props={{ type: type, action: 'Deletar' } }/>}
        </div>
    )
}

export default DeleteModal;