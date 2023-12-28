class QuestaoStorage {
    
    constructor() {

        this.key = "listasQuestoes";
    }

    obterStorage() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    atualizarStorage(arrayListas) {
        
        localStorage.setItem(this.key, JSON.stringify(arrayListas));
    }

    adicionarListaQuestoes(lista) {
        
        const storage = this.obterStorage();

        storage.push(lista);

        this.atualizarStorage(storage);
    }

    obterListaQuestoes(idDisciplina) {
        
        const storage = this.obterStorage();

        const lista = storage.find((listaQuest) => listaQuest.idDisciplina === idDisciplina);

        return lista;
    }


    obterQuestao(idDisciplina, idQuestao) {

        const storage = this.obterStorage();

        const listaDisciplina = storage.find((lista) => lista.idDisciplina === idDisciplina);
        const questao = listaDisciplina.questoes.find((questao) => questao.id === idQuestao);

        return questao;
    }

    adicionarQuestao(idDisciplina, questao) {
        
        const storage = this.obterStorage();

        const i = storage.findIndex((lista) => lista.idDisciplina === idDisciplina);
        
        storage[i].questoes.push(questao);
    }
}

export default QuestaoStorage;
