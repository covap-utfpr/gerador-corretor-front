import { useContext, useEffect, useState } from "react";
import { lerVariosDiretorios } from "../../api/diretorio";
import { GlobalContext } from "../gerais/Global";
import ModalCriarDisciplina from "../modais/ModalCriarDisciplina";
import ModalExcluir from "../modais/ModalExcluir";

const ListaDisciplinas = () => {

    const { idDiretorioRaiz, listaDisciplinas, dispatchListaDisciplinas } = useContext(GlobalContext);
    const [ modalCriar, setModalCriar ] = useState(false);
    const [ modalDeletar, setModalDeletar ] = useState(false);

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
                        <button onClick={() => setModalDeletar({id: disciplina.id, nome: disciplina.nome})}>excluir</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setModalCriar(true)}>Criar nova disciplina</button>
            { modalCriar && <ModalCriarDisciplina setModal={setModalCriar}/>}
            { modalDeletar && <ModalExcluir setModal={setModalDeletar} id={modalDeletar.id} nome={modalDeletar.nome} />}
        </div>
    )
}

export default ListaDisciplinas;