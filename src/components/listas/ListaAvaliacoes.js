import { useContext, useEffect, useState } from "react";
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { GlobalContext } from "../gerais/Global";
import { requisitarListas } from "../../utils/requisitarListas";
import StorageListas from "../../storage/StorageListas";

const ListaAvaliacoes = () => {

    const storageAvaliacao = new StorageListas("listasAvaliacoes");
    
    const { listaDisciplinas, listasAvaliacoes, dispatchListasAvaliacoes, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const [ disciplina, setDisciplina ] = useState();
    const [ avaliacoes, setAvaliacoes ] = useState();

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
                    </li>
                ))}
            </ul>
           
            <button type="button">Criar nova avaliaçao</button>
        </div>
    )
}

export default ListaAvaliacoes;