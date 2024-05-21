import { useContext } from "react";
import { GlobalContext } from "../gerais/Global";
import { deletarUmaQuestao } from "../../api/questao";

const ModalExcluirQuestao = ({ setModal, idDisciplina, idQuestao, nome}) => {

    const { idDiretorioRaiz, setMensagem, dispatchListasQuestoes} = useContext(GlobalContext);
   
    async function handleExcluir() {

        const idQuestaoExcluida = await deletarUmaQuestao(idQuestao, null);

        if(idQuestaoExcluida.data) {

            setMensagem(
                {
                    entidade: 'questao',
                    acao: 'excluida'
                }
            );

            dispatchListasQuestoes( 
                {
                    type: 'excluirElementoLista',
                    payload: {
                        idDisciplina: idDisciplina,
                        idQuestao: idQuestao
                    }
                }
            );

            setModal(false);

        } else if(idQuestaoExcluida.error) {

            console.error(idQuestaoExcluida.error);

            setModal(false);
        }
    }

    return (
        <div className="modal">
            <p> Tem certeza que deseja excluir a questão {nome}?</p>
            <button type="button" onClick={() => handleExcluir()}>Excluir</button>
            <button type="button" onClick={() => setModal(false)}>Cancelar</button>
        </div>
    )
}

export default ModalExcluirQuestao;