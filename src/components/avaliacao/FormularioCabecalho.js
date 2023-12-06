import { useState } from "react";
import SelectDisciplinas from "../gerais/SelectDisciplinas";

const FormularioCabecalho = ({ handleFunction }) => {

    const [titulo, setTitulo ] = useState()
    const [instituicao, setInstituicao ] = useState()
    const [disciplina, setDisciplina ] = useState()
    const [data, setData ] = useState()
    const [instrucoes, setInstrucoes] = useState()

    function handleTitulo(event) {
        setTitulo(event.target.value);
    }  
    function handleInstituicao(event) {
        setInstituicao(event.target.value);
    }
    function handleDisciplina(event) {
        setDisciplina(event.target.value);
    }
    function handleData(event) {
        setData(event.target.value);
    }
    function handleInstrucoes(event) {
        setInstrucoes(event.target.value);
    }
    function handleSubmit(event) {

        event.preventDefault();

        handleFunction({
            titulo: titulo,
            instituicao: instituicao,
            disciplina: disciplina,
            data: data,
            instrucoes: instrucoes
        });
    }

    return (
        <div className="modulo">

            <form className="form" onSubmit={(event) => handleSubmit(event)} >

                <h2>Cabeçalho</h2>

                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da avaliação</label>
                    <input 
                        type="text"
                        name="titulo"
                        id="titulo"
                        required
                        onChange={(event) => handleTitulo(event)}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="instituicao">Instituição de Ensino</label>
                    <input 
                        type="text"
                        name="instituicao"
                        id="instituicao"
                        onChange={(event) => handleInstituicao(event)}
                    />
                </div>
                <div className="campo-form">
                    <SelectDisciplinas handleFunction={handleDisciplina}/>
                </div>
                <div className="campo-form">
                    <label htmlFor="data">Data de realização / Prazo</label>
                    <input 
                        type="date"
                        name="data"
                        id="data"
                        required
                        onChange={(event) => handleData(event)}
                    />
                </div>

                <div className="campo-form">
                    <label htmlFor="instrucoes">Instruções para os alunos</label>
                    <textarea 
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