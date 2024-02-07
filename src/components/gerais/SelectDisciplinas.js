import { lerVariosDiretorios } from "../../api/diretorio";
import { useEffect, useContext } from "react";
import { GlobalContext } from './Global';

const SelectDisciplinas = ({ handleFunction }) => {

    const { idDiretorioRaiz, listaDisciplinas, dispatchListaDisciplinas } = useContext(GlobalContext);

    async function fetchDisciplinas() {

        const listaDisciplinas = await lerVariosDiretorios(idDiretorioRaiz);

        if(listaDisciplinas.data) {
            
            dispatchListaDisciplinas({type:'atualizarListaDisciplinas', payload: listaDisciplinas.data});
    
        } else if (listaDisciplinas.error) {
    
            console.error(listaDisciplinas.error);
        }   
    }

    useEffect(() => {
        
        if(listaDisciplinas.length === 0) {
            fetchDisciplinas();
        }
        
    }, [ listaDisciplinas ]);

    return (
        <div className="select-disciplinas">
            <h3>Disciplina</h3>
            <select name="disciplinas" id="disciplinas" onChange={(event) => { handleFunction(event) }}>
                {listaDisciplinas.map((disciplina, index) => (
                    <option key={index} value={disciplina.id}>
                        {disciplina.nome}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectDisciplinas;