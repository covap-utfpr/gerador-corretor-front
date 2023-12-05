import ListaQuestoes from "../components/listas/ListaQuestoes";
import ListaDisciplinas from "../components/listas/ListaDisciplinas";
import ModalCriarDisciplina from "../components/modais/ModalCriarDisciplina";
import ModalCriarQuestao from "../components/modais/ModalCriarQuestao";
import { useState } from "react";

const Editar = () => {

    const [ criarQuestao, setCriarQuestao ] =  useState(false);
    const [ criarDisciplina, setCriarDisciplina ] =  useState(false);

    return (
        <main>
            <div className={ criarDisciplina || criarQuestao ? "ativo fundo-modal" : "fundo-modal" }></div>
            <div className="modulo" id="questoes">
                <h1>Questões</h1>
                <div className="lista">
                    <ListaQuestoes />
                    <button onClick={() => setCriarQuestao(true)}>Criar nova questao</button>
                    { criarQuestao && <ModalCriarQuestao ativar={setCriarQuestao}/> }
                </div>
            </div>
            <div className="modulo" id="avaliacoes">
                <h1>Avaliações</h1>
                <div className="lista">

                </div>
            </div>
            <div className="modulo" id="disciplinas">
                <h1>Disciplinas</h1>
                <div className="lista">
                    <ListaDisciplinas />
                    <button onClick={() => setCriarDisciplina(true)}>Criar nova disciplina</button>
                    { criarDisciplina && <ModalCriarDisciplina ativar={setCriarDisciplina}/> }
                </div>
            </div>
        </main>   
    )
}

export default Editar;