import { useContext, useState } from "react";
import { GlobalContext } from "../gerais/Global";
import { useEffect } from "react";

const ListaQuestoesAvaliacao = () => {

    const { avaliacaoAtual, dispatchAvaliacaoAtual } = useContext(GlobalContext);
    const [tipo, setTipo ] = useState([])
    const [valor, setValor ] = useState([])
   
    let somaValorQuestoes = 0;
    let valoresQuestoes = [];

    function handleTipo(event) {
        setTipo(event.target.value);
    }  
    function handleValor(event, indexQuestao){
        if(somaValorQuestoes + (event.target.value - valoresQuestoes[indexQuestao]) <= avaliacaoAtual.cabecalho.valor){
            somaValorQuestoes += (event.target.value - valoresQuestoes[indexQuestao]);
            valoresQuestoes[indexQuestao] = event.target.value;
        } else{
            console.log("Valor da avaliação excedido")
            event.target.value = 0;
        }
    }  

    useEffect(() => {
        
    }, [avaliacaoAtual]);

    function handleSubmit(event) {

        event.preventDefault();

        dispatchAvaliacaoAtual(
            {
                type: 'atualizarQuestaoAvaliacaoAtual', 
                payload: {
                    tipo: tipo,
                    valor: valor,
                }
            });
    }

    return (
        <div className="lista-questoes-avaliacao">
            <h2>Questões Adicionadas</h2>
            <ul>
                <form className="form" onSubmit={(event) => handleSubmit(event)} >
                    {avaliacaoAtual.questoes && avaliacaoAtual.questoes.map((questao, index) => {
                        valoresQuestoes.push(0);
                        return(
                            <li key={index} value={questao.nome}>
                                <span>{index}</span>
                                <span>{questao.nome}</span> 
                                <div className="campo-form">
                                    <select name="tipo" id="tipo" onChange={(event) => {handleTipo(event)}}>
                                        <option key={1} value="vf">V/F</option>
                                        <option key={2} value="escolha">a,b</option>
                                        <option key={3} value="descritiva">desc</option>
                                    </select>
                                </div>
                                <div className="campo-form">
                                    <input 
                                        type="number"
                                        name="valor"
                                        id="valor"
                                        min="0"
                                        onChange={(event) => {handleValor(event, index)}}
                                    />
                                </div>
                            </li>
                        )
                    })}
                    <button type="submit">Editar</button>
                </form>
            </ul>
        </div>
    )
}

export default ListaQuestoesAvaliacao;
