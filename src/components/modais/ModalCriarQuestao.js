import { useEffect, useState } from "react";
import { criarUmaQuestao } from '../../api/questao';
import SelectDisciplinas from "../gerais/SelectDisciplinas";

const ModalCriarQuestao = ( { setModal } ) => {

    const [ disciplina, setDisciplina ] = useState("");
    const [ titulo, setTitulo ] = useState("");
    const [ enunciado, setEnunciado ] = useState("");
    const [ alternativas, setAlternativas ] = useState([]);

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();
            
        const idQuestao = await criarUmaQuestao(titulo, enunciado, alternativas, "", disciplina);

        if(idQuestao.data) {
            
            //questaoStorage.adicionarQuestao(disciplina, {nome: titulo, id: idQuestao.data})
        
        } else if(idQuestao.error){

            console.error(idQuestao.error);
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

    function handleAlternativasChange(event) {
        
        const alternativa = event.target.value;
        setAlternativas(array => [...array, alternativa]);
    }

    function handleDisciplinaChange(event) {
        setDisciplina(event.target.value);
    }

    return (
        <div className="modal">
            
            <h2>Nova Questao</h2>

            <form onSubmit={(event) => handleSubmit(event)}>

                <SelectDisciplinas handleFunction={handleDisciplinaChange}/>
               
                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da Questao</label>
                    <input 
                        type="text"
                        name="titulo"
                        id="titulo"
                        required
                        onChange={(event) => handleTituloChange(event)}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="enunciado">Enunciado</label>
                    <textarea 
                        name="enunciado" 
                        id="enunciado" 
                        cols="30" 
                        rows="10"
                        required
                        onChange={(event) => handleEnunciadoChange(event)}
                    ></textarea>
                </div>

                <h3>Alternativas</h3>

                <div className="campo-form">
                    {[...Array(5)].map((el, i) => 
                        <textarea 
                            name="alternativa" 
                            key={`alternativa-${i}`} 
                            id={`alternativa-${i}`} 
                            cols="30" 
                            rows="3"
                            required
                            onChange={(event) => handleAlternativasChange(event)}
                        ></textarea> 
                    )}
                </div>

                <button type="submit">Enviar</button>
                <button className="fechar" onClick={() => {setModal(false)}}>Fechar</button>
            </form>
        </div>
    )
}

export default ModalCriarQuestao;