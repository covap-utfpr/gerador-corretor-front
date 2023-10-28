import { useState } from "react";
import { postDiretorio } from "../../api/diretorio";
import Cookies from "js-cookie";

const ModalCriarDisciplina = () => {

    const [nome, setNome] = useState("");

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();

        const idDiretorioApp =  Cookies.get("diretorioApp");

        let idDisciplina = await postDiretorio(nome, idDiretorioApp);
        
        if(idDisciplina.data) {

            console.log("Disciplina criada com sucesso");
            console.log(idDisciplina.data);

        } else if (idDisciplina.error) {

            console.error("Erro ao criar disciplina");
        }
    }

    function handleNomeChange(event) {
        
        setNome(event.target.value);
    }

    return (
        <div className="modal-criar-disciplina">
            <h2>Nova Disciplina</h2>
            <div className="formulario-disciplina">
            
                <form onSubmit={(event) => handleSubmit(event)}>

                    <label htmlFor="nome">Nome da Disciplina</label>
                    <input 
                        type="text"
                        name="nome"
                        id="nome"
                        onChange={(event) => handleNomeChange(event)}
                    />

                    <button className="salvar" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalCriarDisciplina;