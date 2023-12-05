import { useAtomValue, useAtom } from "jotai";
import { listaDisciplinasAtom, idDiretorioRaizAtom } from "../../storages/diretorioStorage";
import { lerVariosDiretorios } from "../../api/diretorio";
import { useEffect } from "react";

const ListaDisciplinas = () => {

    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);
    const [ disciplinasStorage, setDisciplinasStorage ] = useAtom(listaDisciplinasAtom);

    async function fetchDisciplinas() {

        const listaDisciplinas = await lerVariosDiretorios(idDiretorioRaiz);
        
        if(listaDisciplinas.data) {
    
            setDisciplinasStorage(listaDisciplinas.data);

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
        <div className="lista-disciplinas">
            <ul>
                {disciplinasStorage && disciplinasStorage.map((disciplina, index) => (
                    <li key={index} value={disciplina.name}>
                        {disciplina.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaDisciplinas;