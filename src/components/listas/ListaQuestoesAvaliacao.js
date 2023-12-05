import { useAtomValue } from "jotai";
import { questoesAvaliacaoAtom } from "../../storages/avaliacaoStorage";

const ListaQuestoesAvaliacao = () => {
    
    const questoesAvaliacaoStorage = useAtomValue(questoesAvaliacaoAtom);

    return (
        <div className="lista-questoes-avaliacao">
            <h3>Questões Adicionadas</h3>
            <ul>
                {questoesAvaliacaoStorage && questoesAvaliacaoStorage.map((questao, index) => (
                    <li key={index} value={questao.nome}>
                        <span>{index}</span>
                        <span>{questao.nome}</span> 
                        <div className="campo-form">
                            <select name="tipo" id="tipo">
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
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaQuestoesAvaliacao;