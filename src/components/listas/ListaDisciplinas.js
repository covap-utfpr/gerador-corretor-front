import { useContext, useEffect, useState } from "react";
import { lerVariosDiretorios } from "../../api/diretorio";
import { GlobalContext } from "../gerais/Global";
import ModalCriarDisciplina from "../modais/ModalCriarDisciplina";

const ListaDisciplinas = () => {

    const { idDiretorioRaiz, listaDisciplinas, dispatchListaDisciplinas } = useContext(GlobalContext);
    const [ modal, setModal ] = useState(false);

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
        
    }, [ listaDisciplinas ]);

    return (
        <div className="lista">
            <h2>Disciplinas</h2>
            <ul>
                {listaDisciplinas && listaDisciplinas.map((disciplina, index) => (
                    <li key={index} value={disciplina.nome}>
                        {disciplina.nome}
                        <button>excluir</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setModal(true)}>Criar nova disciplina</button>
            { modal && <ModalCriarDisciplina setModal={setModal}/>}
        </div>
    )
}

export default ListaDisciplinas;