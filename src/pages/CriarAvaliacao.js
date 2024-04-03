import ListaQuestoes from "../components/listas/ListaQuestoes";
import ListaQuestoesAvaliacao from "../components/listas/ListaQuestoesAvaliacao";
import FormularioCabecalho from "../components/avaliacao/FormularioCabecalho";
import FormularioConfiguracoes from "../components/avaliacao/FormularioConfiguracoes";
import { criarUmaAvaliacao } from "../api/avaliacao";
import { GlobalContext } from "../components/gerais/Global";
import { useContext } from "react";
import criarPDF from "../utils/criarPDF";

const CriarAvaliacao = () => {

    const { listaDisciplinas, avaliacaoAtual } = useContext(GlobalContext);

    async function handleSubmit(event) {

        criarPDF( listaDisciplinas, avaliacaoAtual );

        event.preventDefault();

        const idAvaliacao = await criarUmaAvaliacao(avaliacaoAtual);

        if(idAvaliacao.data) {

            console.log(idAvaliacao.data)
        
        } else if(idAvaliacao.error){

            console.error(idAvaliacao.error);
        }
    }

    return (
        <main>
            <section className="visualizando-avaliacao">   
                <h1>Visualização da avaliação</h1>
                <div className="modulo">
                    <div className="lista">
                        <ListaQuestoesAvaliacao />
                    </div>
                </div>
            </section>
            <section className="gerando-avaliacao">
                <h1>Gerando sua avaliação</h1> 
                <div className="modulo">
                    <ListaQuestoes prova={true}/>
                </div>
                <div className="modulo">
                    <FormularioCabecalho />
                </div>
                <div className="modulo">
                    <FormularioConfiguracoes />
                </div>
                <button onClick={(event) => {handleSubmit(event)}}>Gerar Avaliaçao</button>       
            </section>
        </main>
    )
}

export default CriarAvaliacao;

