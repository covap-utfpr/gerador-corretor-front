import { useContext, useEffect, useState } from "react";
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { GlobalContext } from "../gerais/Global";
import { requisitarListas } from "../../utils/requisitarListas";
import StorageListas from "../../storage/StorageListas";
import ModalExcluirQuestaoEAvaliacao from "../modais/ModalExcluirQuestaoEAvaliacao";

const ListaAvaliacoes = () => {

    const storageAvaliacao = new StorageListas("listasAvaliacoes");
    
    const { listaDisciplinas, listasAvaliacoes, dispatchListasAvaliacoes, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const [ disciplina, setDisciplina ] = useState();
    const [ avaliacoes, setAvaliacoes ] = useState();
    const [ modalDeletar, setModalDeletar ] = useState(false);

    async function fetchAvaliacoes() {

        const listas = await requisitarListas(listaDisciplinas, "avaliacao");

        if(listas) {
            dispatchListasAvaliacoes({type: 'atualizarStorage', payload: listas})
        }
    }    

    useEffect(() => {

        if (listasAvaliacoes.length === 0) {
            fetchAvaliacoes();  
        }

    }, []);

    useEffect(() => {

        if (listasAvaliacoes.length !== 0) {

            const lista = storageAvaliacao.obterLista(listasAvaliacoes, disciplina);

            if(lista) {
                setAvaliacoes(lista);
            } else {
                setAvaliacoes(false);
            }

        } else {

            setAvaliacoes(false);
        }

    }, [ disciplina]);

    function handleDisciplinaChange(valor) {
        setDisciplina(valor);
    }

    return (
        <div className="lista">
            <h2>Avaliações</h2>
            <SelectDisciplinas handleFunction={handleDisciplinaChange} />
            <ul>
                {avaliacoes && avaliacoes.map((avaliacao, index) => (
                    <li key={index} value={avaliacao.nome}>
                        <span>{avaliacao.nome}</span>
                        <button onClick={() => setModalDeletar({ idDisciplina: disciplina, idAvaliacao: avaliacao.id, nome: avaliacao.nome})}>excluir</button>
                    </li>
                ))}
            </ul>
           
            <button type="button">Criar nova avaliação</button>
            { modalDeletar && <ModalExcluirQuestaoEAvaliacao setModal={setModalDeletar} idDisciplina={modalDeletar.idDisciplina} idElemento={modalDeletar.idAvaliacao} nome={modalDeletar.nome} type = "avaliação"/>}
        </div>
    )
}

export default ListaAvaliacoes;