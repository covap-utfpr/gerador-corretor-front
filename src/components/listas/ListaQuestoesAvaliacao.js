import { useContext, useState } from "react";
import { GlobalContext } from "../gerais/Global";

const ListaQuestoesAvaliacao = () => {

    const { avaliacaoAtual, dispatchAvaliacaoAtual } = useContext(GlobalContext);
    const [tipo, setTipo ] = useState()
    const [valor, setValor ] = useState()

    function handleTipo(event) {
        setTipo(event.target.value);
    }  
    function handleValor(event) {
        setValor(event.target.value);
    }  

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
                    {avaliacaoAtual.questoes && avaliacaoAtual.questoes.map((questao, index) => (
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
                                    type="text"
                                    name="valor"
                                    id="valor"
                                    onChange={(event) => {handleValor(event)}}
                                />
                            </div>
                        </li>
                    ))}
                    <button type="submit">Editar</button>
                </form>
            </ul>
        </div>
    )
}

export default ListaQuestoesAvaliacao;