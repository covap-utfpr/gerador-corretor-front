import ListaQuestoes from "../lists/ListaQuestoes";
import ListaQuestoesAvaliacao from "../lists/ListaQuestoesAvaliacao";
import FormularioCabecalho from "../avaliacao/FormularioCabecalho";
import FormularioConfiguracoes from "../avaliacao/FormularioConfiguracoes";
import { criarUmaAvaliacao } from "../../api/avaliacao";
import { GlobalContext } from "../gerais/Global";
import { useContext } from "react";

const Test = () => {

    const { avaliacaoAtual, dispatchListasAvaliacoes, setMensagem} = useContext(GlobalContext);

    async function handleSubmit(event) {

        event.preventDefault();

        const idAvaliacao = await criarUmaAvaliacao(avaliacaoAtual.questoes, avaliacaoAtual.cabecalho, avaliacaoAtual.configuracoes);

        if(idAvaliacao.data) {

            setMensagem({
                acao: 'criada',
                entidade: 'avaliacao'
            });

            dispatchListasAvaliacoes(
                {
                    type: 'adicionarElementoLista', 
                    payload: { 
                        idDisciplina: avaliacaoAtual.cabecalho.disciplina, 
                        elementoLista: {
                            nome: avaliacaoAtual.cabecalho.titulo, 
                            id: idAvaliacao.data
                        }
                    }
                }
            );

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

export default Test;

