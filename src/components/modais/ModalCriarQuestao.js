import { useContext, useReducer } from "react";
import { criarUmaQuestao } from '../../api/questao';
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { GlobalContext } from "../gerais/Global";
import StorageQuestaoAtual from "../../storage/StorageQuestaoAtual";

const ModalCriarQuestao = ( { setModal } ) => {

    const storageQuestaoAtual = new StorageQuestaoAtual();

    const {  dispatchListasQuestoes, setMensagem } = useContext(GlobalContext);

    const [ questaoAtual, dispatchQuestaoAtual ] = useReducer(storageQuestaoAtual.reducer, 
                                                                storageQuestaoAtual.obterValorInicial());

    async function handleSubmit(event) {
        
        event.preventDefault();
          
        const idQuestao = await criarUmaQuestao(questaoAtual.idDisciplina,
                                                questaoAtual.titulo,
                                                questaoAtual.enunciado,
                                                questaoAtual.alternativas,
                                                "",
                                                ""
                                                );

        if(idQuestao.data) {

            setMensagem({
                acao: 'criada',
                entidade: 'questao'
            });

            dispatchListasQuestoes(
                {
                    type: 'adicionarElementoLista', 
                    payload: { 
                        idDisciplina: questaoAtual.idDisciplina, 
                        elementoLista: {
                            nome: questaoAtual.titulo, 
                            id: idQuestao.data
                        }
                    }
                }
            );
        
        } else if(idQuestao.error){

            console.error(idQuestao.error);
        }
    }

    //funçao que reseta o state titulo a cada mudança ocorrida no campo
    function handleTituloChange(event) {
        dispatchQuestaoAtual(
            {
                type: 'adicionarSecao', 
                payload: {
                    conteudo: event.target.value,
                    secao: 'titulo'
                }
            }
        );
    }

    //funçao que reseta o state enunciado a cada mudança ocorrida no campo
    function handleEnunciadoChange(event) {
        dispatchQuestaoAtual(
            {
                type: 'adicionarSecao', 
                payload: {
                    conteudo: event.target.value,
                    secao: 'enunciado'
                }
            }
        );
    }

    function handleAlternativasChange(event) {
        dispatchQuestaoAtual(
            {
                type:'atualizarAlternativa', 
                payload: {
                    alternativa: event.target.value, 
                    id: event.target.id}
            }
        );
    }

    function handleDisciplinaChange(valor) {

        dispatchQuestaoAtual(
            {
                type: 'adicionarSecao', 
                payload: {
                    conteudo: valor,
                    secao: 'idDisciplina'
                }
            }
        );
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
                            value={questaoAtual.alternativas[i]}
                            required
                            onChange={(event) => handleAlternativasChange(event)}
                        ></textarea> 
                    )}
                </div>

                <button type="submit">Enviar</button>
                <button type="button" className="fechar" onClick={() => {setModal(false)}}>Fechar</button>
            </form>
        </div>
    )
}

export default ModalCriarQuestao;