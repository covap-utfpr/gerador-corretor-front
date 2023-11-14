import { useState } from "react";
import { useAtomValue , useSetAtom} from "jotai";
import { idDiretorioRaizAtom, listaDisciplinasAtom } from "../../states/directoryState";
import { criarUmDiretorio, lerVariosDiretorios } from "../../api/diretorio";

const ModalCriarDisciplina = () => {

    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);
    const setDisciplinas = useSetAtom(listaDisciplinasAtom);
    const [nome, setNome] = useState("");

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();

        const idDisciplina = await criarUmDiretorio(nome, idDiretorioRaiz);

        if(idDisciplina.data) {
            
            let [idDiretorioQuestoes, idDiretorioAvaliacoes, listaDisciplinas] = await Promise.all([
                criarUmDiretorio("Questoes", idDisciplina.data),
                criarUmDiretorio("Avaliacoes", idDisciplina.data),
                lerVariosDiretorios(idDiretorioRaiz), 
            ]);
        
            if(listaDisciplinas.data) {
        
                setDisciplinas(listaDisciplinas.data);
        
            } else if (listaDisciplinas.error) {
        
                console.error(listaDisciplinas.error);
            }   

        } else if (idDisciplina.error) {

            console.error("Erro ao criar disciplina");
        }
    }

    function handleNomeChange(event) {
        
        setNome(event.target.value);
    }

    return (
        <div className="modal-criar-disciplina">
            <h2>Nova Disciplina</h2>
            <div className="formulario-disciplina">
            
                <form onSubmit={(event) => handleSubmit(event)}>

                    <label htmlFor="nome">Nome da Disciplina</label>
                    <input 
                        type="text"
                        name="nome"
                        id="nome"
                        onChange={(event) => handleNomeChange(event)}
                    />

                    <button className="salvar" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalCriarDisciplina;