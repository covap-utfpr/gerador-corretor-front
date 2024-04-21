import { lerVariosDiretorios } from "../../api/diretorio";
import { useEffect, useContext } from "react";
import { GlobalContext } from './Global';

const SelectDisciplinas = ({ handleFunction }) => {

    const { listasQuestoes, listasAvaliacoes, idDiretorioRaiz, listaDisciplinas, dispatchListaDisciplinas } = useContext(GlobalContext);

    async function fetchDisciplinas() {

        const listaDisciplinas = await lerVariosDiretorios(idDiretorioRaiz);

        if(listaDisciplinas.data) {
            
            dispatchListaDisciplinas({type:'atualizarStorage', payload: listaDisciplinas.data});
    
        } else if (listaDisciplinas.error) {
    
            console.error(listaDisciplinas.error);
        }   
    }

    useEffect(() => {
        
        if(listaDisciplinas.length === 0) {
            fetchDisciplinas();
        }
        
    }, [ idDiretorioRaiz ]);

    useEffect(() => {
        
        if(listasQuestoes.length !== 0) {
            handleFunction(listasQuestoes[0].idDisciplina);
        } else {
            handleFunction(false);
        }

    }, [listasQuestoes]);

    useEffect(() => {
        
        if(listasAvaliacoes.length !== 0) {
            handleFunction(listasAvaliacoes[0].idDisciplina);
        } else {
            handleFunction(false);
        }

    }, [listasAvaliacoes]);

    return (
        <div className="select-disciplinas">
            <h3>Disciplina</h3>
            <select name="disciplinas" onChange={(event) => { handleFunction(event.target.value) }}>
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

