import ListaQuestoes from "../components/listas/ListaQuestoes";
import ListaDisciplinas from "../components/listas/ListaDisciplinas";

const Editar = () => {

    return (
        <main>
            <div className="modulo" id="disciplinas">
                <ListaDisciplinas />
            </div>    
            <div className="modulo" id="questoes">
                <ListaQuestoes />
            </div>
            <div className="modulo" id="avaliacoes">
            </div>   
        </main>   
    )
}

export default Editar;