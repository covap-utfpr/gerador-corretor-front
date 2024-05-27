import { useContext, useState } from "react";
import SelectDisciplinas from "../globals/SubjectSelect";
import { GlobalContext } from "../globals/Global";

const FormularioCabecalho = () => {

    const { avaliacaoAtual, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    function handleChange(event, prop) {
        dispatchAvaliacaoAtual(
            {
                type: 'updateSection', 
                payload: {
                    section: 'header',
                    prop: prop,
                    content: event.target.value,
                }
            }
        );
    }
    
    function handleSubmit(event) {

        event.preventDefault();

        avaliacaoAtual.questoes.forEach((questao, index) => {

            dispatchAvaliacaoAtual({
                type: 'atualizarQuestao',
                payload: {
                    index: index,
                    valor: '0'
                }
            })
        })

    }

    return (
        <div className="form">

            <h2>Cabeçalho</h2>

            <form>
                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da avaliação</label>
                    <input 
                        value={titulo}
                        type="text"
                        name="titulo"
                        id="titulo"
                        required
                        onChange={(event) => handleChange(event, 'title')}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="instituicao">Instituição de Ensino</label>
                    <input 
                        value={instituicao} 
                        type="text"
                        name="instituicao"
                        id="instituicao"
                        onChange={(event) => handleChange(event, 'institution')}
                    />
                </div>
                <div className="campo-form">
                    <SelectDisciplinas handleFunction={}/>
                </div>
                <div className="campo-form">
                    <label htmlFor="data">Data de realização / Prazo</label>
                    <input 
                        value={data}
                        type="date"
                        name="data"
                        id="data"
                        required
                        onChange={(event) => handleData(event)}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="valor">Valor</label>
                    <input 
                        value={valor}
                        type="number"
                        name="valor"
                        id="valor"
                        required
                        onChange={(event) => handleValor(event)}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="instrucoes">Instruções para os alunos</label>
                    <textarea 
                        value={instrucoes}
                        name="instrucoes" 
                        id="instrucoes" 
                        cols="30" 
                        rows="10"
                        required
                        onChange={(event) => handleInstrucoes(event)}
                    ></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default FormularioCabecalho;