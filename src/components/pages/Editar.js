import ListaQuestoes from "../listas/ListaQuestoes";
import ListaDisciplinas from "../listas/ListaDisciplinas";
import ListaAvaliacoes from "../listas/ListaAvaliacoes";
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