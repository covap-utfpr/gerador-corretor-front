import ListaQuestoes from "../components/listas/ListaQuestoes";
import ListaDisciplinas from "../components/listas/ListaDisciplinas";
import ListaAvaliacoes from "../components/listas/ListaAvaliacoes";
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
                <ListaAvaliacoes />
            </div>   
        </main>   
    )
}

export default Editar;