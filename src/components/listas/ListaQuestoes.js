import { useEffect, useState } from "react";
import { lerVariasQuestoes } from "../../api/questao";
import DiretorioStorage from "../../storages/diretorioStorage";
import QuestaoStorage from "../../storages/questaoStorage";
import AvaliacaoAtualStorage from "../../storages/avaliacaoAtualStorage";
import SelectDisciplinas from "../gerais/SelectDisciplinas";

const ListaQuestoes = ( { prova }) => {
    
    const diretorioStorage = new DiretorioStorage();
    const questaoStorage = new QuestaoStorage();
    const avaliacaoAtualStorage = new AvaliacaoAtualStorage();
    const [ questoes, setQuestoes ] = useState();
    const [ disciplina, setDisciplina ] = useState();

    async function fetchQuestoes() {

        const listaQuestoes = await lerVariasQuestoes(disciplina, diretorioStorage.obterDiretorioRaiz());

        if(listaQuestoes.data) {

            setQuestoes(listaQuestoes.data);

            questaoStorage.adicionarListaQuestoes(listaQuestoes.data);

        } else if (listaQuestoes.error) {

            console.error(listaQuestoes.error);
        }
    }    

    useEffect(() => {

        if (questaoStorage.obterStorage().length !== 0) {

            const lista = questaoStorage.obterListaQuestoes(disciplina);

            if(lista) {
                setQuestoes(lista);
            } else {
                fetchQuestoes();   
            }

        } else {

            fetchQuestoes();   
        }

    }, [disciplina]);

    function handleDisciplinaChange(event) {
        setDisciplina(event.target.value);
    }

    function handleQuestaoAvaliacao(idQuestao, nomeQuestao) {
        avaliacaoAtualStorage.adicionarQuestao({id: idQuestao, nome: nomeQuestao});
    }

    return (
        <div className="lista-questoes">
            <SelectDisciplinas handleFunction={handleDisciplinaChange} />
            <ul>
                {questoes && questoes.questoes.map((questao, index) => (
                    <li key={index} value={questao.nome}>
                        {questao.nome}
                        {prova && <button onClick={() => handleQuestaoAvaliacao(questao.id, questao.nome)}>+</button>}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaQuestoes;