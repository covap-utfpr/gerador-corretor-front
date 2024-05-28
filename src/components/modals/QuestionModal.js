import { useContext, useEffect, useReducer, useState } from "react";
import { criarUmaQuestao } from '../../api/questionCalls';
import SelectDisciplinas from "../globals/SubjectSelect";
import { GlobalContext } from "../globals/Global";
import StorageQuestaoAtual from "../../storage/StorageQuestaoAtual";
import Questao from "../../models/Questao";

const QuestionModal = ( { setModal, acao, id } ) => {

    const {  dispatchListasQuestoes, setMensagem, questaoCriando, dispatchQuestaoCriando, questaoEditando, dispatchQuestaoEditando } = useContext(GlobalContext);
    let [ questaoAtual, setQuestaoAtual ] = useState(new Questao("", "", "", [], "", ""));
    
    // async function handleEditar(idQuestao) {
        
    //     const questao = await lerUmaQuestao(idQuestao);

    //     if(questao.data) {

    //         setModal("editar")

    //         dispatchQuestaoEditando({type: 'atualizarStorage', payload: questao.data});

    //     } else if (questao.error){

    //         console.log(questao.error);
    //     }
    // }
    useEffect(() => {

        console.log("aqui")
        
        if(acao === "criar")
            setQuestaoAtual(questaoCriando);
        else if(acao === "editar")
            setQuestaoAtual(questaoEditando);
    }, [questaoEditando, questaoCriando]);

    async function handleSubmit(event) {
        
        event.preventDefault();

        const paramsQuestao = [
            questaoAtual.idDisciplina,
            questaoAtual.titulo,
            questaoAtual.enunciado,
            questaoAtual.alternativas,
            "",
            "",
        ]
        
        let idQuestao;

        if(acao === "criar") {
            idQuestao = await criarUmaQuestao(paramsQuestao);
        } else if (acao === "editar") {
            //idQuestao = await editarUmaQuestao();
        }

        if(idQuestao.data) {

            setMensagem({
                acao: acao,
                entidade: 'questao'
            });

            if(acao === "criar") {
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
            } else if(acao === "editar") {

                // fazer esse case de ediçao de titulo
                // dispatchListasQuestoes({
                //     type: 'editarQuestao'
                // })
            }
        
        } else if(idQuestao.error){

            console.error(idQuestao.error);
        }
    }

    //funçao que reseta o state titulo a cada mudança ocorrida no campo
    function handleTituloChange(event) {

        const objetoQuestao = {
            type: 'adicionarSecao', 
            payload: {
                conteudo: event.target.value,
                secao: 'titulo'
            }
        }
        if(acao === "criar") 
            dispatchQuestaoCriando(objetoQuestao);
        else if(acao === "editar")
            dispatchQuestaoEditando(objetoQuestao);

    }

    //funçao que reseta o state enunciado a cada mudança ocorrida no campo
    function handleEnunciadoChange(event) {

        const objetoQuestao = {
            type: 'adicionarSecao', 
            payload: {
                conteudo: event.target.value,
                secao: 'enunciado'
            }
        }
        if(acao === "criar") 
            dispatchQuestaoCriando(objetoQuestao);
        else if(acao === "editar")
            dispatchQuestaoEditando(objetoQuestao);
    }

    function handleAlternativasChange(event) {

        const objetoQuestao =  {
            type:'atualizarAlternativa', 
            payload: {
                alternativa: event.target.value, 
                id: event.target.id}
        }

        if(acao === "criar") 
            dispatchQuestaoCriando(objetoQuestao);
        else if(acao === "editar")
            dispatchQuestaoEditando(objetoQuestao);
    }

    function handleDisciplinaChange(valor) {

        const objetoQuestao =   {
            type: 'adicionarSecao', 
            payload: {
                conteudo: valor,
                secao: 'idDisciplina'
            }
        }

        if(acao === "criar") 
            dispatchQuestaoCriando(objetoQuestao);
        else if(acao === "editar")
            dispatchQuestaoEditando(objetoQuestao);
    }

    return (
        <div className="modal">
            
            <h2>{acao} Questao</h2>

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

                <button type="submit">{acao}</button>
                <button type="button" className="fechar" onClick={() => {setModal(false)}}>Fechar</button>
            </form>
        </div>
    )
}

export default QuestionModal;