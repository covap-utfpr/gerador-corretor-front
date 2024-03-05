import { useContext, useReducer } from "react";
import { criarUmaQuestao } from '../../api/questao';
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { estadoInicialQuestaoAtual, reducerQuestaoAtual } from "../../storage/questaoAtualStorage";
import { GlobalContext } from "../gerais/Global";

const ModalCriarQuestao = ( { setModal } ) => {

    const {  dispatchListasQuestoes } = useContext(GlobalContext);

    const [ questaoAtual, dispatchQuestaoAtual ] = useReducer(reducerQuestaoAtual, estadoInicialQuestaoAtual());

    async function handleSubmit(event) {
        
        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();
          
        const idQuestao = await criarUmaQuestao(questaoAtual);

        if(idQuestao.data) {
            
            dispatchListasQuestoes({type: 'adicionarQuestao', payload: { idDisciplina: questaoAtual.idDisciplina, questao: {nome: questaoAtual.titulo, id: idQuestao.data}}});
        
        } else if(idQuestao.error){

            console.error(idQuestao.error);
        }
    }

    //funçao que reseta o state titulo a cada mudança ocorrida no campo
    function handleTituloChange(event) {
        dispatchQuestaoAtual({type: 'adicionarTitulo', payload: event.target.value});
    }

    //funçao que reseta o state enunciado a cada mudança ocorrida no campo
    function handleEnunciadoChange(event) {
        dispatchQuestaoAtual({type: 'adicionarEnunciado', payload: event.target.value});
    }

    function handleAlternativasChange(event) {
        dispatchQuestaoAtual({type:'atualizarAlternativa', payload: {alternativa: event.target.value, id: event.target.id}});
    }

    function handleDisciplinaChange(event) {
        dispatchQuestaoAtual({type:'atualizarIdDisciplina', payload: event.target.value});
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
                        value={questaoAtual.titulo}
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
                        value={questaoAtual.enunciado}
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
                            id={i} 
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