class avaliacaoAtualStorage {
    
    constructor() {

        this.key = "AvaliacaoAtualStorage";
    }

    obterStorage() {
        return JSON.parse(localStorage.getItem(this.key)) || {questoes: []};
    }

    atualizarStorage(arrayListas) {
        
        localStorage.setItem(this.key, JSON.stringify(arrayListas));
    }

    adicionarQuestao(questao) {
        
        const storage = this.obterStorage();

        storage.questoes.push(questao);

        this.atualizarStorage(storage);
    }

    obterQuestoes() {
      
        const storage = this.obterStorage();

        return storage.questoes || [];
    }
}

export default avaliacaoAtualStorage;
