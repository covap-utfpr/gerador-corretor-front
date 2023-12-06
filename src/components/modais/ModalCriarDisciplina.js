import { useState } from "react";
import { useAtomValue, useSetAtom} from "jotai";
import { idDiretorioRaizAtom, adicionarDisciplinaStorage, listaDisciplinasAtom } from "../../storages/diretorioStorage";
import { criarUmDiretorio } from "../../api/diretorio";

const ModalCriarDisciplina = ( { ativar } ) => {

    const idDiretorioRaiz = useAtomValue(idDiretorioRaizAtom);
    const setDisciplinasStorage = useSetAtom(listaDisciplinasAtom);
    const [nome, setNome] = useState();

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();

        const idDisciplina = await criarUmDiretorio(nome, idDiretorioRaiz);

        if(idDisciplina.data) {
            
            let [ idDiretorioQuestoes, idDiretorioAvaliacoes ] = await Promise.all([
                criarUmDiretorio("Questoes", idDisciplina.data),
                criarUmDiretorio("Avaliacoes", idDisciplina.data),
            ]);
        
            if(idDiretorioQuestoes.data && idDiretorioAvaliacoes.data) {
                
                setDisciplinasStorage(adicionarDisciplinaStorage(nome, idDisciplina.data));

            } else if (idDiretorioQuestoes.error) {
        
                console.error(idDiretorioQuestoes.error);

            } else if (idDiretorioAvaliacoes.error){

                console.error(idDiretorioAvaliacoes.error);
            }

        } else if (idDisciplina.error) {

            console.error("Erro ao criar disciplina");
        }
    }

    function handleNomeChange(event) {
        
        setNome(event.target.value);
    }

    return (
        <div className="modal">
            <h2>Nova Disciplina</h2>
            <div className="formulario-disciplina">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="campo-form">
                        <label htmlFor="nome">Nome da Disciplina</label>
                        <input 
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            onChange={(event) => handleNomeChange(event)}
                        />
                    </div>
                    <button className="enviar" type="submit">Enviar</button>
                    <button className="fechar" onClick={() => ativar(false)}>Fechar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalCriarDisciplina;