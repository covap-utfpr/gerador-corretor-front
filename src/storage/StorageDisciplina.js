
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

        case 'excluirDisciplina': 

          return this.excluirDisciplina(action, state);

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

  excluirDisciplina = (action, state) => {

    const novoEstado = [...state]; 
    const index = novoEstado.findIndex(disciplina => disciplina.id == action.payload);

    novoEstado.splice(index, 1);

    localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));

    return novoEstado;
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

