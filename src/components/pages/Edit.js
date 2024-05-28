import ListaQuestoes from "../lists/ListaQuestoes";
import ListaDisciplinas from "../lists/ListaDisciplinas";
import ListaAvaliacoes from "../lists/TestLists";

const Edit = () => {

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

export default Edit;