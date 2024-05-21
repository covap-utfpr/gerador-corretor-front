import { useContext } from "react";
import { GlobalContext } from "../gerais/Global";
import { deletarUmaQuestao } from "../../api/questao";
import { deletarUmaAvaliacao } from "../../api/avaliacao";

const ModalExcluirQuestaoEAvaliacao = ({ setModal, idDisciplina, idElemento, nome, type}) => {

    const { idDiretorioRaiz, setMensagem, dispatchListasQuestoes, dispatchListasAvaliacoes} = useContext(GlobalContext);
   
    async function handleExcluir() {

        const idElementoExcluido = (type === "questão") ? await deletarUmaQuestao(idElemento, null) : await deletarUmaAvaliacao(idElemento, null);

        if(idElementoExcluido.data) {

            setMensagem(
                {
                    entidade: type,
                    acao: 'excluida'
                }
            );

            const acaoExcluirElemento = {
                type: 'excluirElementoLista',
                payload: {
                    idDisciplina: idDisciplina,
                    idElemento: idElemento
                }
            }

            if(type == "questão")
                dispatchListasQuestoes(acaoExcluirElemento);
             else
                dispatchListasAvaliacoes(acaoExcluirElemento);
    
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

export default ModalExcluirQuestaoEAvaliacao;