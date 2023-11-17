import { useAtomValue, useAtom } from "jotai";
import { listaDisciplinasAtom, idDiretorioRaizAtom } from "../states/directoryState";
import { lerVariosDiretorios } from "../api/diretorio";

const SelectDisciplinas = ({ handleFunction }) => {

    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);
    const [ disciplinas, setDisciplinas ] = useAtom(listaDisciplinasAtom);

    async function fetchDisciplinas() {

        const listaDisciplinas = await lerVariosDiretorios(idDiretorioRaiz);
        
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