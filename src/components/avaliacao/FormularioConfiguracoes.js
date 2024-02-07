import { useContext, useState } from "react";
import { GlobalContext } from "../gerais/Global";

const FormularioConfiguracoes = () => {

    const { dispatchAvaliacaoAtual } = useContext(GlobalContext);

    const [disposicao, setDisposicao ] = useState();
    const [gabarito, setGabarito ] = useState();
    const [fonte, setFonte ] = useState();
    const [tamanhoFonte, setTamanhoFonte ] = useState();
    const [espaco, setEspaco ] = useState();

    function handleDisposicaoChange(event) {
        setDisposicao(event.target.value);
    }
    function handleGabarito(event) {
        setGabarito(event.target.value);
    }
    function handleFonte(event) {
        setFonte(event.target.value);
    }
    function handleTamanhoFonte(event) {
        setTamanhoFonte(event.target.value);
    }
    function handleEspaco(event) {
        setEspaco(event.target.value)
    }
    
    function handleSubmit(event) {

        event.preventDefault();
        
        dispatchAvaliacaoAtual({type: 'adicionarConfiguracoes', payload:  {
            disposicao: disposicao,
            gabarito: gabarito,
            fonte: fonte,
            tamanhoFonte: tamanhoFonte,
            espaco: espaco,
        }});
    }

    return (
        <div className="form">

            <h2>Configurações Gerais</h2>

            <form onSubmit={(event) => handleSubmit(event)}>
                
                <div className="campo-form">
                    <fieldset onChange={(event) => {handleDisposicaoChange(event)}}>
                        <legend>Disposição das questões</legend>
                        <div>
                            <input type="radio" id="duas" name="duas" value="duas" />
                            <label htmlFor="duas">Duas colunas</label>  
                        </div>
                        <div>
                            <input type="radio" id="uma" name="uma" value="uma" />
                            <label htmlFor="uma">Uma coluna</label>  
                        </div>
                    </fieldset>
                </div>

                <div className="campo-form">
                    <fieldset onChange={(event) => {handleGabarito(event)}}>
                        <legend>Posição do gabarito</legend>
                        <div>
                            <input type="radio" id="inicio" name="inicio" value="inicio" />
                            <label htmlFor="inicio">Inicio</label>  
                        </div>
                        <div>
                            <input type="radio" id="fim" name="fim" value="fim" />
                            <label htmlFor="fim">Fim</label>  
                        </div>
                    </fieldset>
                </div>

                <div className="campo-form">
                    <label htmlFor="fonte">Fonte</label>
                    <select name="fonte" id="fonte" onChange={(event) => {handleFonte(event)}} >
                        <option key={1} value="Arial">Arial</option>
                    </select>
                </div>

                <div className="campo-form">
                    <label htmlFor="font-size">Tamanho da fonte</label>
                    <input 
                        type="number"
                        name="font-size"
                        id="font-size"
                        min="6" max="18"
                        required
                        onChange={(event) => handleTamanhoFonte(event)}
                    /> px
                </div>

                <div className="campo-form">
                    <label htmlFor="espaco">Espaço para rascunho</label>
                    <input 
                        type="number"
                        name="espaco"
                        id="espaco"
                        min="1" max="20"
                        required
                        onChange={(event) => handleEspaco(event)}
                    /> linhas
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default FormularioConfiguracoes;