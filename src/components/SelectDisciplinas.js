import { useAtomValue, useAtom } from "jotai";
import { listaDisciplinasAtom, idDiretorioPaiAtom } from "../states/directoryState";
import { readDiretorios } from "../api/diretorio";
import { useState } from "react";

const SelectDisciplinas = ({ handleFunction }) => {

    const idDiretorioPai = useAtomValue(idDiretorioPaiAtom);
    const [ disciplinas, setDisciplinas ] = useAtom(listaDisciplinasAtom);

    async function fetchDisciplinas() {

        const listaDisciplinas = await readDiretorios(idDiretorioPai);
        
        if(listaDisciplinas.data) {
    
            setDisciplinas(listaDisciplinas.data);
    
        } else if (listaDisciplinas.error) {
    
            console.error(listaDisciplinas.error);
        }   
    }

    if(disciplinas.length === 0) {

        fetchDisciplinas();
    }

    return (
        <div className="select-disciplinas">
            <h3>Disciplinas: </h3>
            <select name="disciplinas" id="disciplinas" onChange={(event) => { handleFunction(event) }}>
                {disciplinas.map((diretorio, index) => (
                    <option key={index} value={diretorio.name}>
                    {diretorio.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectDisciplinas;