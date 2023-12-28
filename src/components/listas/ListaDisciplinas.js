import { lerVariosDiretorios } from "../../api/diretorio";
import { useEffect } from "react";
import DiretorioStorage from "../../storages/diretorioStorage";

const ListaDisciplinas = () => {

    const diretorioStorage = new DiretorioStorage;
    const disciplinas = diretorioStorage.obterStorage();

    // async function fetchDisciplinas() {

    //     const listaDisciplinas = await lerVariosDiretorios(idDiretorioRaiz);
        
    //     if(listaDisciplinas.data) {
    
    //         setDisciplinasStorage(listaDisciplinas.data);

    //     } else if (listaDisciplinas.error) {
    
    //         console.error(listaDisciplinas.error);
    //     }   
    // }

    // useEffect(() => {
        
    //     // if(disciplinasStorage.length === 0) {
    //     //     console.log("lista")
    //     //     fetchDisciplinas();
    //     // }
    // },);
    
    return (
        <div className="lista-disciplinas">
            <ul>
                {disciplinas && disciplinas.map((disciplina, index) => (
                    <li key={index} value={disciplina.name}>
                        {disciplina.nome}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaDisciplinas;