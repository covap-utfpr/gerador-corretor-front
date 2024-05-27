import { useContext } from "react";
import { GlobalContext } from "../gerais/Global";

const ListaQuestoesAvaliacao = () => {

    const { avaliacaoAtual, dispatchAvaliacaoAtual } = useContext(GlobalContext);

    function valorValido(valor, indexQuestao) {

        const valorTotalAvaliacao = avaliacaoAtual.cabecalho.valor;

        let soma = 0;
        
        avaliacaoAtual.questoes.forEach((questao, index) => {

            if(index != indexQuestao) 
                soma += +questao.valor;
        });

        const valorMaxQuestao = valorTotalAvaliacao - soma;

        return valor > valorMaxQuestao ? false : true;
    }  

    function handleTipo(event, index) {

        dispatchAvaliacaoAtual(
            {
                type: 'atualizarQuestao', 
                payload: {
                    index: index,
                    tipo: event.target.value,
                }
            }
        );
    }
    
    function handleValor(event, index) {

        const valor = event.target.value;

        if(valorValido(valor, index)) {

            dispatchAvaliacaoAtual(
                {
                    type: 'atualizarQuestao', 
                    payload: {
                        index: index,
                        valor: valor,
                    }
                }
            );

        } else {
            console.error("Valor invalido");
        }
    }

    return (
        <div className="lista-questoes-avaliacao">
            <h2>Questões Adicionadas</h2>
            <ul>
                <form className="form" >
                    {avaliacaoAtual.questoes && avaliacaoAtual.questoes.map((questao, index) => (
                        <li id={index} key={index} value={questao.nome}>
                            <span>{index}</span>
                            <span>{questao.nome}</span> 
                            <div className="campo-form">
                                <select name="tipo" id={"select-"+index} value={questao.tipo} onChange={(event) => { handleTipo(event, index)}}>
                                    <option key={1} value="vf">V/F</option>
                                    <option key={2} value="escolha">a,b</option>
                                    <option key={3} value="descritiva">desc</option>
                                </select>
                            </div>
                            <div className="campo-form">
                                <input 
                                    value={questao.valor}
                                    type="number"
                                    name="valor"
                                    id={"input-"+index} 
                                    min="0"
                                    onChange={(event) => {handleValor(event, index)}}
                                />
                            </div>
                        </li>
                    ))}
                </form>
            </ul>
        </div>
    )
}

export default ListaQuestoesAvaliacao;