import { useState } from "react";
import ListaQuestoes from "../components/listas/ListaQuestoes";
import ModalCriarQuestao from "../components/modais/ModalCriarQuestao";
import ListaQuestoesAvaliacao from "../components/listas/ListaQuestoesAvaliacao";
import FormularioCabecalho from "../components/avaliacao/FormularioCabecalho";
import FormularioConfiguracoes from "../components/avaliacao/FormularioConfiguracoes";
import AvalicaoAtualStorage from "../storages/avaliacaoAtualStorage";
import { criarUmaAvaliacao } from "../api/avaliacao";

const CriarAvaliacao = () => {

    const avaliacaoAtualStorage = new AvalicaoAtualStorage();
    const [ criarQuestao, setCriarQuestao ] =  useState(false);
    const [ cabecalho, setCabecalho ] = useState({}); 
    const [ configuracoes, setConfiguracoes ] = useState({}); 

    async function handleSubmit(event) {

        event.preventDefault();

        console.log(cabecalho)

        const idAvaliacao = await criarUmaAvaliacao(cabecalho, configuracoes, avaliacaoAtualStorage.obterQuestoes());

        if(idAvaliacao.data) {

            console.log(idAvaliacao.data)
        
        } else if(idAvaliacao.error){

            console.error(idAvaliacao.error);
        }
    }

    function handleCabecalho(objeto) {
        setCabecalho(objeto);
    }

    function handleConfiguracoes(objeto) {
        setConfiguracoes(objeto);
    }
    return (
        <main>
            <div className={ criarQuestao ? "ativo fundo-modal" : "fundo-modal" }></div>

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
                    <div className="lista">
                        <h2>Questões Disponíveis</h2>   
                        <ListaQuestoes prova={true}/>
                        <button onClick={() => setCriarQuestao(true)}>Criar nova questao</button>
                        { criarQuestao && <ModalCriarQuestao ativar={setCriarQuestao}/> }
                    </div>
                </div>

                <FormularioCabecalho handleFunction={handleCabecalho}/>
                <FormularioConfiguracoes handleFunction={handleConfiguracoes}/>

                <button onClick={(event) => {handleSubmit(event)}}>Gerar Avaliaçao</button>
                
            </section>

        </main>
    )
}

export default CriarAvaliacao;