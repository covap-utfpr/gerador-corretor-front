import { useContext, useState } from "react";
import SelectDisciplinas from "../gerais/SelectDisciplinas";
import { GlobalContext } from "../gerais/Global";
import CabecalhoAvaliacao from "../../modelos/CabecalhoAvalicao";

const FormularioCabecalho = () => {

    const { avaliacaoAtual, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const [titulo, setTitulo ] = useState(avaliacaoAtual.cabecalho.titulo)
    const [instituicao, setInstituicao ] = useState(avaliacaoAtual.cabecalho.instituicao)
    const [disciplina, setDisciplina ] = useState(avaliacaoAtual.cabecalho.disciplina)
    const [data, setData ] = useState(avaliacaoAtual.cabecalho.data)
    const [instrucoes, setInstrucoes] = useState(avaliacaoAtual.cabecalho.instrucoes)
    const [valor, setValor] = useState(avaliacaoAtual.cabecalho.valor)

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
    function handleValor(event) {
        setValor(event.target.value);
    }
    
    function handleSubmit(event) {

        event.preventDefault();

        avaliacaoAtual.questoes.forEach((questao, index) => {
            console.log(index)
            dispatchAvaliacaoAtual({
                type: 'atualizarQuestaoAvaliacaoAtual',
                payload: {
                    index: index,
                    valor: '0'
                }
            })
        })

        dispatchAvaliacaoAtual(
            {
                type: 'adicionarCabecalho', 
                payload: new CabecalhoAvaliacao(titulo, instituicao, disciplina, data, instrucoes, valor)
            }
        )
    }

    return (
        <div className="form">

            <h2>Cabeçalho</h2>

            <form onSubmit={(event) => handleSubmit(event)} >
                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da avaliação</label>
                    <input 
                        value={titulo}
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
                        value={instituicao} 
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