
const TestQuestionsList = ({ test, dispatch }) => {

    function setValue(value, indexquestion) {

        const total = test.header.value;

        let sum = 0;
        
        test.questions.forEach((question, index) => {

            if(index != indexquestion) 
                sum += +question.value;
        });

        const maxValue = total - sum;

        return value > maxValue ? false : true;
    }  

    function handleType(event, index) {

        dispatch(
            {
                type: 'updateQuestion', 
                payload: {
                    index: index,
                    type: event.target.value,
                }
            }
        );
    }
    
    function handleValue(event, index) {

        const value = event.target.value;

        if(setValue(value, index)) {
            console.log(value, index)
            dispatch(
                {
                    type: 'updateQuestion', 
                    payload: {
                        index: index,
                        value: value,
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
                    {test.questions && test.questions.map((question, index) => (
                        <li id={index} key={index} value={question.name}>
                            <span>{index}</span>
                            <span>{question.name}</span> 
                            <div className="campo-form">
                                <select name="tipo" id={"select-"+index} value={question.type} onChange={(event) => { handleType(event, index)}}>
                                    <option key={1} value="vf">V/F</option>
                                    <option key={2} value="escolha">a,b</option>
                                    <option key={3} value="descritiva">desc</option>
                                </select>
                            </div>
                            <div className="campo-form">
                                <input 
                                    value={question.value}
                                    type="number"
                                    name="valor"
                                    id={"input-"+index} 
                                    min="0"
                                    onChange={(event) => {handleValue(event, index)}}
                                />
                            </div>
                        </li>
                    ))}
                </form>
            </ul>
        </div>
    )
}

export default TestQuestionsList;