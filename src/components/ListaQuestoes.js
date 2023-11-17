import { useEffect, useState } from "react";
import { lerVariasQuestoes } from "../api/questao";
import { idDiretorioRaizAtom } from "../states/directoryState";
import { useAtomValue } from "jotai";
import SelectDisciplinas from "./SelectDisciplinas";

const ListaQuestoes = () => {
    
    const [ questoes, setQuestoes ] = useState();
    const [ disciplina, setDisciplina ] = useState("Disciplina");

    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);

    async function fetchQuestoes() {

        const listaQuestoes = await lerVariasQuestoes(disciplina, idDiretorioRaiz);

        if(listaQuestoes.data) {

            setQuestoes(listaQuestoes.data);
        
        } else if (listaQuestoes.error) {

            console.error(listaQuestoes.error);
        }
    }        

    useEffect(() => {
        fetchQuestoes();
    }, [ disciplina ]);

    function handleDisciplinaChange(event) {
        setDisciplina(event.target.value);
    }

    return (
        <div className="lista-questoes">
            <SelectDisciplinas handleFunction={handleDisciplinaChange} />
            <ul>
                {questoes && questoes.map((questao, index) => (
                    <li key={index} value={questao.name}>
                        {questao.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaQuestoes;