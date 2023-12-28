class DiretorioStorage {
    
  constructor() {

      this.key = "listaDisciplinas";
  }

  obterDiretorioRaiz() {
    return JSON.parse(localStorage.getItem("idDiretorioRaiz"));
  }

  atualizarDiretorioRaiz(id) {

    localStorage.setItem("idDiretorioRaiz", JSON.stringify(id));
  }

  obterStorage() {
      
      return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  atualizarStorage(lista) {
      
      localStorage.setItem(this.key, JSON.stringify(lista));
  }

  adicionarDiretorio(diretorio) {
      
      const storage = this.obterStorage();

      storage.push(diretorio);

      this.atualizarStorage(storage);
  }

  obterDiretorio(id) {

      const storage = this.obterStorage();

      const diretorio = storage.find((diretorio) => diretorio.id === id);

      return diretorio;
  }
}

module.exports = DiretorioStorage;
