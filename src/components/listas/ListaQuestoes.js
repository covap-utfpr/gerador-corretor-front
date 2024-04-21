import { useContext, useEffect, useState } from "react";
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { GlobalContext } from "../gerais/Global";
import { requisitarListas } from "../../utils/requisitarListas";
import ModalCriarQuestao from "../modais/ModalCriarQuestao";
import QuestaoAvaliacao from "../../modelos/QuestaoAvaliacao";
import StorageListas from "../../storage/StorageListas";

const ListaQuestoes = ( { prova }) => {

    const storageQuestao = new StorageListas("listasQuestoes");
    
    const [ modal, setModal ] = useState(false);

    const { listaDisciplinas, listasQuestoes, dispatchListasQuestoes, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const [ disciplina, setDisciplina ] = useState();
    const [ questoes, setQuestoes ] = useState();

    async function fetchQuestoes() {

        const listas = await requisitarListas(listaDisciplinas, "questao");

        if(listas) {
            dispatchListasQuestoes({type: 'atualizarStorage', payload: listas})
        }
    }    

    useEffect(() => {

        if (listasQuestoes.length === 0) {
            fetchQuestoes();  
        }

    }, []);


    useEffect(() => {

        if (listasQuestoes.length !== 0) {

            const lista = storageQuestao.obterLista(listasQuestoes, disciplina);

            if(lista) {
                setQuestoes(lista);
            } else {
                setQuestoes(false);
            }

        } else {
            setQuestoes(false);
        }

    }, [ disciplina ])

    function handleDisciplinaChange(valor) {
        setDisciplina(valor);
    }

    function handleQuestaoAvaliacao(idDisciplina, idQuestao, nomeQuestao) {

        dispatchAvaliacaoAtual(
            {   type: 'adicionarQuestao', 
                payload: new QuestaoAvaliacao(idDisciplina, idQuestao, nomeQuestao, "", "", "")
            }
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
                        {prova && <button onClick={() => handleQuestaoAvaliacao(disciplina, questao.id, questao.nome)}>+</button>}
                    </li>
                ))}
            </ul>
  
            <button onClick={() => setModal(true)}>Criar nova questao</button>
            {modal && <ModalCriarQuestao setModal={setModal}/>}
        </div>
    )
}

export default ListaQuestoes;