import { useContext, useEffect, useState } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";

const TestConfigsForm = ({ action }) => {

    const { currentEditTest, dispatchCurrentEditTest, currentCreateTest, dispatchCurrentCreateTest, editInfos } = useContext(CurrentTestContext);
    const [ test, setTest ] = useState({});

    if(action == 'create'){
        setTest(currentCreateTest);
    } else if( action == 'edit') {
        setTest(currentEditTest);
    }

    useEffect(() => {
        setTest(currentCreateTest);
    }, [currentCreateTest]);

    useEffect(() => {
        setTest(currentEditTest);
    }, [currentEditTest]);

    function handleChange(event, prop) {

        const objChange =   {
            type: 'updateSection', 
            payload: {
                section: 'configs',
                prop: prop,
                content: event.target.value,
            }
        }
       
        if(action == 'create')
            dispatchCurrentCreateTest(objChange);
        else if(action == 'edit')
            dispatchCurrentEditTest(objChange);
    }

    return (
        <div className="form">

            <h2>Configurações Gerais</h2>

            <form>
                
                <div className="campo-form">
                    <fieldset value={test.order} onChange={(event) => handleChange(event, 'order')}>
                        <legend>Disposição das questões</legend>
                        <div>
                            <input type="radio" id="duas" name="disposicao" value="2" />
                            <label htmlFor="duas">Duas colunas</label>  
                        </div>
                        <div>
                            <input type="radio" id="uma" name="disposicao" value="1" />
                            <label htmlFor="uma">Uma coluna</label>  
                        </div>
                    </fieldset>
                </div>

                <div className="campo-form">
                    <fieldset value={test.answCardPosition} onChange={(event) => handleChange(event, 'answCardPosition')}>
                        <legend>Posição do gabarito</legend>
                        <div>
                            <input type="radio" id="inicio" name="posicao" value="inicio" />
                            <label htmlFor="inicio">Inicio</label>  
                        </div>
                        <div>
                            <input type="radio" id="fim" name="posicao" value="fim" />
                            <label htmlFor="fim">Fim</label>  
                        </div>
                    </fieldset>
                </div>

                <div className="campo-form">
                    <label htmlFor="fonte">Fonte</label>
                    <select value={test.font} name="fonte" id="fonte" onChange={(event) => handleChange(event, 'font')} >
                        <option key={1} value="Arial">Arial</option>
                        <option key={2} value="Arial">Times New Roman</option>
                    </select>
                </div>

                <div className="campo-form">
                    <label htmlFor="font-size">Tamanho da fonte</label>
                    <input 
                        value={test.fontSize}
                        type="number"
                        name="font-size"
                        id="font-size"
                        min="6" max="18"
                        required
                        onChange={(event) => handleChange(event, 'fontSize')}
                    /> px
                </div>

                <div className="campo-form">
                    <label htmlFor="espaco">Espaço para rascunho</label>
                    <input 
                        value={test.lines}
                        type="number"
                        name="espaco"
                        id="espaco"
                        min="1" max="20"
                        required
                        onChange={(event) => handleChange(event, 'lines')}
                    /> linhas
                </div>
            </form>
        </div>
    );
}

export default TestConfigsForm;