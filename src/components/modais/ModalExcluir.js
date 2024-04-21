import { useContext } from "react";
import StorageListas from "../../storage/StorageListas";
import { GlobalContext } from "../gerais/Global";
import { deletarUmDiretorio } from "../../api/diretorio";

const ModalExcluir = ({ setModal, id, nome}) => {

    const storageListasQuestoes = new StorageListas("listasQuestoes");
    const storageListasAvaliacoes = new StorageListas("listasAvaliacoes");

    const { listasQuestoes, listasAvaliacoes, idDiretorioRaiz, setMensagem, dispatchListaDisciplinas, dispatchListasQuestoes, dispatchListasAvaliacoes, dispatchAvaliacaoAtual} = useContext(GlobalContext);

    const qntQuestoes = storageListasQuestoes.obterQuantidade(listasQuestoes, id);
    const qntAvaliacoes = storageListasAvaliacoes.obterQuantidade(listasAvaliacoes, id);
   
    async function handleExcluir() {

        const idDiretorioExcluido = await deletarUmDiretorio(id, idDiretorioRaiz);

        if(idDiretorioExcluido.data) {

            setMensagem(
                {
                    entidade: 'disciplina',
                    acao: 'excluida'
                }
            );

            dispatchListaDisciplinas( 
                {
                    type: 'excluirDisciplina',
                    payload: id
                }
            );

            dispatchListasQuestoes( 
                {
                    type: 'excluirLista',
                    payload: id
                }
            );

            dispatchListasAvaliacoes( 
                {
                    type: 'excluirLista',
                    payload: id
                }
            );
            
            // dispatchAvaliacaoAtual( 
            //     {
            //         type: 'excluirQuestoesDisciplina',
            //         payload: id
            //     }
            // );

            setModal(false);

        } else if(idDiretorioExcluido.error) {

            console.error(idDiretorioExcluido.error);

            setModal(false);
        }
    }

    return (
        <div className="modal">
            <p> Tem certeza que deseja excluir a disciplina {nome}? Esta disciplina tem mais de {qntQuestoes} questões e {qntAvaliacoes} provas que serão excluídas!</p>
            <button type="button" onClick={() => handleExcluir()}>Excluir</button>
            <button type="button" onClick={() => setModal(false)}>Cancelar</button>
        </div>
    )
}

export default ModalExcluir;