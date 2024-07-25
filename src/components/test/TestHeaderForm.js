
import SubjectSelect from "../globals/SubjectSelect";

const TestHeaderForm = ({ test, dispatch }) => {

    function handleChange(event, prop) {

        dispatch({
            type: 'updateSection', 
            payload: {
                section: 'header',
                prop: prop,
                content: event.target.value,
            }
        });
    }
    
    function handleSubjectChange(id) {
    
        dispatch( {
            type: 'updateSection', 
            payload: {
                section: 'header',
                prop: 'subject',
                content: id,
            }
        });
    }

    function handleValueChange(event) {

        dispatch({
            type: 'updateSection', 
            payload: {
                section: 'header',
                prop: 'value',
                content: event.target.value,
            }
        })

        test.questions.forEach((question, index) => {
            dispatch({
                type: 'updateQuestion',
                payload: {
                    index: index,
                    valor: '0'
                }
            });
        })
    }

    return (
        <div className="form">
            <h2>Cabeçalho</h2>
            <form>
                <div className="campo-form">
                    <label htmlFor="titulo">Titulo da avaliação</label>
                    <input 
                        value={test.header.title}
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
                        value={test.header.institution} 
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
                        value={test.header.date}
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
                        value={test.header.value}
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
                        value={test.header.instructions}
                        name="instrucoes" 
                        id="instrucoes" 
                        cols="30" 
                        rows="10"
                        required
                        onChange={(event) => handleChange(event, 'instructions')}
                    ></textarea>
                </div>
            </form>
        </div>
    );
}

export default TestHeaderForm;