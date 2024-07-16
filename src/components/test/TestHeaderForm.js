import { useContext, useEffect, useState } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import SubjectSelect from "../globals/SubjectSelect";

const TestHeaderForm = ({action}) => {

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
                section: 'header',
                prop: prop,
                content: event.target.value,
            }
        }
       
        if(action == 'create')
            dispatchCurrentCreateTest(objChange);
        else if(action == 'edit')
            dispatchCurrentEditTest(objChange);
    }
    
    function handleSubjectChange(id) {

        const objChange =   {
            type: 'updateSection', 
            payload: {
                section: 'header',
                prop: 'subject',
                content: id,
            }
        }
       
        if(action == 'create')
            dispatchCurrentCreateTest(objChange);
        else if(action == 'edit')
            dispatchCurrentEditTest(objChange);
    }

    function handleValueChange(event) {

        if(action == 'create') {

            dispatchCurrentCreateTest({
                type: 'updateSection', 
                payload: {
                    section: 'header',
                    prop: 'value',
                    content: event.target.value,
                }
            })

            currentCreateTest.questions.forEach((question, index) => {
                dispatchCurrentCreateTest({
                    type: 'updateQuestion',
                    payload: {
                        index: index,
                        valor: '0'
                    }
                });
            })
        } else if(action == 'edit'){

            dispatchCurrentEditTest({
                type: 'updateSection', 
                payload: {
                    section: 'header',
                    prop: 'value',
                    content: event.target.value,
                }
            })

            currentEditTest.questions.forEach((question, index) => {
                dispatchCurrentEditTest({
                    type: 'updateQuestion',
                    payload: {
                        index: index,
                        valor: '0'
                    }
                });
            })
        }
    }

    return (
        <div className="form">
            <h2>Cabeçalho</h2>
            <form>
                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da avaliação</label>
                    <input 
                        value={test.title}
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
                        value={test.institution} 
                        type="text"
                        name="instituicao"
                        id="instituicao"
                        onChange={(event) => handleChange(event, 'institution')}
                    />
                </div>
                <div className="campo-form">
                    <SubjectSelect setParentSubject={handleSubjectChange}/>
                </div>
                <div className="campo-form">
                    <label htmlFor="data">Data de realização / Prazo</label>
                    <input 
                        value={test.date}
                        type="date"
                        name="data"
                        id="data"
                        required
                        onChange={(event) => handleChange(event, 'date')}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="valor">Valor</label>
                    <input 
                        value={test.value}
                        type="number"
                        name="valor"
                        id="valor"
                        required
                        onChange={(event) => handleValueChange(event)}
                    />
                </div>
                <div className="campo-form">
                    <label htmlFor="instrucoes">Instruções para os alunos</label>
                    <textarea 
                        value={test.instructions}
                        name="instrucoes" 
                        id="instrucoes" 
                        cols="30" 
                        rows="10"
                        required
                        onChange={(event) => handleChange(event)}
                    ></textarea>
                </div>
            </form>
        </div>
    );
}

export default TestHeaderForm;