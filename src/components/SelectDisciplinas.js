import { useAtomValue, useAtom } from "jotai";
import { listaDisciplinasAtom, idDiretorioPaiAtom } from "../states/directoryState";
import { readDiretorios } from "../api/diretorio";

const SelectDisciplinas = () => {

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
            <h2>Disciplinas: </h2>
            <select name="disciplinas" id="disciplinas">
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