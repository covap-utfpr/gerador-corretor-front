import { useContext } from "react";
import { deletarUmaQuestao } from "../../api/questionCalls";
import { deletarUmaAvaliacao } from "../../api/testeCalls";
import { LoginContext } from "../../contexts/LoginContext";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { TestListsContext } from "../../contexts/TestListsContext";
import FileCalls from "../../api/FileCalls";

const DeleteModal = ({ setDelete, props }) => {

    // Contextos necessarios
    const { rootDirectoryId } = useContext(LoginContext);
    const { dispatchQuestionLists } = useContext(QuestionListsContext);
    const { dispatchTestsLists } = useContext(TestListsContext);

    const type = 
    const element = props['test'] || props['question'];

    async function handleExcluir() {

        const fileCalls = new FileCalls("");

        const idElementoExcluido =  await deletarUmaQuestao(element.id, null);
        if(idElementoExcluido.data) {

            setMensagem(
                {
                    entidade: type,
                    acao: 'excluida'
                }
            );

            const objetoExcluirElemento = {
                type: 'excluirElementoLista',
                payload: {
                    idDisciplina: idDisciplina,
                    idElemento: idElemento
                }
            }

            if(type == "questão")
                dispatchListasQuestoes(objetoExcluirElemento);
             else
                dispatchListasAvaliacoes(objetoExcluirElemento);
    
            setModal(false);

        } else if(idElementoExcluido.error) {

            console.error(idElementoExcluido.error);

            setModal(false);
        }
    }

    return (
        <div className="modal">
            <p> Tem certeza que deseja excluir a {type} {nome}?</p>
            <button type="button" onClick={() => handleExcluir()}>Excluir</button>
            <button type="button" onClick={() => setModal(false)}>Cancelar</button>
        </div>
    )
}

export default DeleteModal;