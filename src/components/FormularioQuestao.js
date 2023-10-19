import { useState } from "react";
import usePost from "../hooks/usePost";
import useGet from "../hooks/useGet";

const FormularioQuestao = () => {

    const [ titulo, setTitulo ] = useState("");
    const [ enunciado, setEnunciado ] = useState("");
    const [ submit, setSubmit ] = useState(false);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify({
            'titulo': titulo,
            'enunciado': enunciado,
            'imagem': ''
        }), 
    };

    const { data, isLoading, error } = usePost(`http://localhost:8080/questao/criar`, requestOptions, submit);
    
    if(data) {
        console.log(data);
    } else if (error) {
        console.log(error);
    } 

    function handleSubmit(event) {

        event.preventDefault();
        setSubmit(true);
    }

    function handleTituloChange(event) {

        setTitulo(event.target.value);
    }

    function handleEnunciadoChange(event) {
        
        setEnunciado(event.target.value);
    }

    return (
        <nav className="formulario-questao">
            
            <form onSubmit={(event) => handleSubmit(event)}>

                <label htmlFor="titulo">Titulo da Questao</label>
                <input 
                    type="text"
                    name="titulo"
                    id="titulo"
                    onChange={(event) => handleTituloChange(event)}
                />

                <label htmlFor="enunciado">Enunciado:</label>
                <textarea 
                    name="enunciado" 
                    id="enunciado" 
                    cols="30" 
                    rows="10"
                    onChange={(event) => handleEnunciadoChange(event)}
                ></textarea>

                <button type="submit">Enviar</button>

            </form>
        </nav>
    )
}

export default FormularioQuestao;