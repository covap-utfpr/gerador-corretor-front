import { useState } from "react";
import { readDiretorio } from '../../api/diretorio';
import { postQuestao } from '../../api/questao';
import SelectDisciplinas from "../SelectDisciplinas";

const ModalCriarQuestao = () => {

    const [ titulo, setTitulo ] = useState("");
    const [ enunciado, setEnunciado ] = useState("");
    const [ disciplina, setDisciplina ] = useState("");

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();
        console.log(disciplina);
        let idDiretorio = await readDiretorio(disciplina);

        if(idDiretorio.data) {

            console.log("Diretorio recuperado, id: " + idDiretorio.data);

            const idQuestao = await postQuestao(titulo, enunciado, "", idDiretorio.data);

            if(idQuestao.data) {

                console.log("Questao criada, id: " + idQuestao.data);
            
            } else if(idQuestao.error){

                console.error(idQuestao.error);
            }
        
        } else if(idDiretorio.error) {

            console.error(idDiretorio.error);
        }    
    }

    //funçao que reseta o state titulo a cada mudança ocorrida no campo
    function handleTituloChange(event) {
        setTitulo(event.target.value);
    }

    //funçao que reseta o state enunciado a cada mudança ocorrida no campo
    function handleEnunciadoChange(event) {
        
        setEnunciado(event.target.value);
    }

    function handleDisciplinaChange(event) {
        setDisciplina(event.target.value);
    }

    return (
        <div className="formulario-questao">
            <h2>Nova Questao</h2>
            <form onSubmit={(event) => handleSubmit(event)}>

                <SelectDisciplinas handleFunction={handleDisciplinaChange}/>

                <label htmlFor="titulo">Titulo da Questao</label>
                <input 
                    type="text"
                    name="titulo"
                    id="titulo"
                    onChange={(event) => handleTituloChange(event)}
                />

                <label htmlFor="enunciado">Enunciado:</label>
                <textarea 
                    name="enunciado" 
                    id="enunciado" 
                    cols="30" 
                    rows="10"
                    onChange={(event) => handleEnunciadoChange(event)}
                ></textarea>

                <button type="submit">Enviar</button>

            </form>
        </div>
    )
}

export default ModalCriarQuestao;