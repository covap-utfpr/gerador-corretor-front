import { useContext, useEffect, useState } from "react";
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { GlobalContext } from "../gerais/Global";
import { obterListaQuestoes } from "../../storage/questoesStorage";
import { requisitarListasQuestoes } from "../../utils/requisitarListasQuestoes";
import ModalCriarQuestao from "../modais/ModalCriarQuestao";

const ListaQuestoes = ( { prova }) => {
    
    const [ modal, setModal ] = useState(false);

    const { listaDisciplinas, listasQuestoes, dispatchListasQuestoes, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const [ disciplina, setDisciplina ] = useState();
    const [ questoes, setQuestoes ] = useState();

    async function fetchQuestoes() {

        const listas = await requisitarListasQuestoes(listaDisciplinas);

        if(listas) {
            dispatchListasQuestoes({type: 'atualizarListasQuestoes', payload: listas})
        }
    }    

    useEffect(() => {

        if (listasQuestoes.length !== 0) {
            
            const lista = obterListaQuestoes(listasQuestoes, disciplina);

            if(lista) {
                setQuestoes(lista);
            }

        } else {

            fetchQuestoes();   
        }

    }, [disciplina]);

    function handleDisciplinaChange(event) {
        setDisciplina(event.target.value);
    }

    function handleQuestaoAvaliacao(idQuestao, nomeQuestao) {

        dispatchAvaliacaoAtual(
            {   type: 'adicionarQuestaoAvaliacaoAtual', 
                payload: {
                    nome: nomeQuestao, 
                    id: idQuestao
            }}
        );
    }

    return (
        <div className="lista">
            <h2>Questões {prova && "Disponiveis"}</h2>
            <SelectDisciplinas handleFunction={handleDisciplinaChange} />
            <ul>
                {questoes && questoes.map((questao, index) => (
                    <li key={index} value={questao.nome}>
                        <span>{questao.nome}</span>
                        {prova && <button onClick={() => handleQuestaoAvaliacao(questao.id, questao.nome)}>+</button>}
                    </li>
                ))}
            </ul>
            <button onClick={() => setModal(true)}>Criar nova questao</button>
            {modal && <ModalCriarQuestao setModal={setModal}/>}
        </div>
    )
}

export default ListaQuestoes;