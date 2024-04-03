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


//Getters

const obterNomeDisciplina = (state, idDisciplina) => {

  const disciplina = state.find(disciplina => disciplina.id == idDisciplina);
  return disciplina.nome;
}

export {reducerDisciplinas, obterNomeDisciplina};

