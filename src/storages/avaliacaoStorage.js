class AvaliacaoStorage {
    
    constructor() {
  
        this.key = "listaAvaliacoes";
        this.keyQuestoes = "questoesProva";
    }
  
    obterStorage() {
  
        return JSON.parse(localStorage.getItem(this.key) || []);
    }
  
    atualizarStorage(arrayListas) {
        
        localStorage.setItem(this.key, JSON.stringify(arrayListas));
    }

    // adicionarListaAvaliacoes(lista) {
        
    //     const storage = this.obterStorage();

    //     storage.push(lista);

    //     this.atualizarStorage(storage);
    // }

    // obterQuestao(idDisciplina, idQuestao) {

    //     const storage = this.obterStorage();

    //     const listaDisciplina = storage.find((lista) => lista.idDisciplina === idDisciplina);
    //     const questao = listaDisciplina.questoes.find((questao) => questao.id === idQuestao);

    //     return questao;
    // }

  }
  
  export default AvaliacaoStorage;
  