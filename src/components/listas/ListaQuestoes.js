import { useEffect, useState } from "react";
import { lerVariasQuestoes } from "../../api/questao";
import { useAtom, useAtomValue } from "jotai";
import { idDiretorioRaizAtom } from "../../storages/diretorioStorage";
import { listasQuestoesAtom } from "../../storages/questaoStorage";
import { questoesAvaliacaoAtom } from "../../storages/avaliacaoStorage";
import SelectDisciplinas from "../gerais/SelectDisciplinas";

const ListaQuestoes = () => {
    
    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);
    const [ questoesStorage, setQuestoesStorage] = useAtom(listasQuestoesAtom);
    const [ questoesAvaliacoesStorage, setQuestoesAvaliacoesStorage] = useAtom(questoesAvaliacaoAtom);
    const [ questoes, setQuestoes ] = useState();
    const [ disciplina, setDisciplina ] = useState();

    async function fetchQuestoes() {

        const listaQuestoes = await lerVariasQuestoes(disciplina, idDiretorioRaiz);

        if(listaQuestoes.data) {

            setQuestoes(listaQuestoes.data);

            setQuestoesStorage(listaQuestoes.data);

        } else if (listaQuestoes.error) {

            console.error(listaQuestoes.error);
        }
    }    

    useEffect(() => {

        if (questoesStorage.length !== 0) {

            const res = questoesStorage.find((listaQuest) => listaQuest.idDisciplina === disciplina);

            if(res) {
                setQuestoes(res);
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
        setQuestoesAvaliacoesStorage({id: idQuestao, nome: nomeQuestao});
    }

    return (
        <div className="lista-questoes">
            <SelectDisciplinas handleFunction={handleDisciplinaChange} />
            <ul>
                {questoes && questoes.questoes.map((questao, index) => (
                    <li key={index} value={questao.name}>
                        {questao.name}
                        <button onClick={() => handleQuestaoAvaliacao(questao.id, questao.name)}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaQuestoes;