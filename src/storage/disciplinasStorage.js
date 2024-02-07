const reducerDisciplinas = ( state, action ) => {
    
  switch (action.type) {

      case 'atualizarListaDisciplinas':
          
        return atualizarListaDisciplinas(action);

      case 'adicionarDisciplina':

        return adicionarDisciplina(action, state);

      default:    
        return state;
  }
}

//Setters

const atualizarListaDisciplinas = (action) => {
    
  localStorage.setItem('listaDisciplinas', JSON.stringify(action.payload));
  return action.payload;
}

const adicionarDisciplina = (action, state) => {
    
  localStorage.setItem('listaDisciplinas', JSON.stringify([...state, action.payload]));      
  return [...state, action.payload];
}

export default reducerDisciplinas;