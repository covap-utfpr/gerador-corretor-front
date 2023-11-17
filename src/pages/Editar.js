import ListaQuestoes from "../components/ListaQuestoes";
import ModalCriarDisciplina from "../components/modais/ModalCriarDisciplina";
import ModalCriarQuestao from "../components/modais/ModalCriarQuestao";

const Editar = () => {

    return (
        <main>
            <div id="editar-questoes">
                <h1>Questoes</h1>
                <ListaQuestoes />
                <ModalCriarQuestao />
            </div>
            <div id="editar-disciplinas">
                <h1>Disciplinas</h1>
                <ModalCriarDisciplina />
            </div>
        </main>   
    )
}

export default Editar;