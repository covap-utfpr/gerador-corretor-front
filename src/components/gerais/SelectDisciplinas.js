import DiretorioStorage from "../../storages/diretorioStorage";
import { lerVariosDiretorios } from "../../api/diretorio";
import { useEffect, useState } from "react";

const SelectDisciplinas = ({ handleFunction }) => {

    const diretorioStorage = new DiretorioStorage();
    const [disciplinas, setDisciplinas ] = useState(diretorioStorage.obterStorage());

    async function fetchDisciplinas() {

        const listaDisciplinas = await lerVariosDiretorios(diretorioStorage.obterDiretorioRaiz());

        if(listaDisciplinas.data) {
            
            setDisciplinas(listaDisciplinas.data);
            diretorioStorage.atualizarStorage(listaDisciplinas.data);
    
        } else if (listaDisciplinas.error) {
    
            console.error(listaDisciplinas.error);
        }   
    }

    useEffect(() => {
        
        if(disciplinas.length === 0) {
            fetchDisciplinas();
        }
        
    }, [disciplinas]);

    return (
        <div className="select-disciplinas">
            <h3>Disciplina</h3>
            <select name="disciplinas" id="disciplinas" onChange={(event) => { handleFunction(event) }}>
                {disciplinas.map((disciplina, index) => (
                    <option key={index} value={disciplina.id}>
                        {disciplina.nome}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectDisciplinas;