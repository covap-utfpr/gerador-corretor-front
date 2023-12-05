import { useAtomValue, useAtom } from "jotai";
import { listaDisciplinasAtom, idDiretorioRaizAtom } from "../../storages/diretorioStorage";
import { lerVariosDiretorios } from "../../api/diretorio";
import { useEffect } from "react";

const SelectDisciplinas = ({ handleFunction }) => {

    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);
    const [ disciplinasStorage, setDisciplinasStorage ] = useAtom(listaDisciplinasAtom);

    async function fetchDisciplinas() {

        const listaDisciplinas = await lerVariosDiretorios(idDiretorioRaiz);

        if(listaDisciplinas.data) {
    
            setDisciplinasStorage(listaDisciplinas.data);
            //handleFunction(disciplinasStorage[0].id);
    
        } else if (listaDisciplinas.error) {
    
            console.error(listaDisciplinas.error);
        }   
    }

    useEffect(() => {
        
        if(disciplinasStorage.length === 0) {
            fetchDisciplinas();
        }
    },);

    return (
        <div className="select-disciplinas">
            <h3>Disciplina</h3>
            <select name="disciplinas" id="disciplinas" onChange={(event) => { handleFunction(event) }}>
                {disciplinasStorage.map((disciplina, index) => (
                    <option key={index} value={disciplina.id}>
                        {disciplina.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectDisciplinas;