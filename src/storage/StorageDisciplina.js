
class StorageDisciplina {

  storageKey;

  constructor() {

      this.storageKey = "ListaDisciplinas";
  }

  reducer = ( state, action ) => {
    
    switch (action.type) {
  
        case 'atualizarStorage':
            
          return this.atualizarStorage(action);
  
        case 'adicionarDisciplina':
  
          return this.adicionarDisciplina(action, state);
  
        default:    
          return state;
    }
  
  }

  //Setters
  atualizarStorage = ( action ) => {
    
    localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
    return action.payload;
  }

  adicionarDisciplina = (action, state) => {
      
    localStorage.setItem(this.storageKey, JSON.stringify([...state, action.payload]));      
    return [...state, action.payload];
  }

  //Getters
  
  obterValorInicial = () => {
        
    const storage = JSON.parse(localStorage.getItem(this.storageKey));
    return storage ? storage : [];
  }

  obterNomeDisciplina = (state, idDisciplina) => {

    const disciplina = state.find(disciplina => disciplina.id == idDisciplina);
    return disciplina.nome;
  }
}

export default StorageDisciplina;

