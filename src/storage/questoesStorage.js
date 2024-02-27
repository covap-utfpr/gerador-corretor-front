const reducerQuestoes = ( state, action ) => {
    
    switch (action.type) {
  
        case 'atualizarListasQuestoes':

            return atualizarListasQuestoes(action);

        case 'adicionarListaQuestoes':

            return adicionarListaQuestoes(state, action);
        
        case 'atualizarListaQuestoes':

            return atualizarListaQuestoes(state, action);

        case 'adicionarQuestao':

            return adicionarQuestao(state, action);

        default:
            return state;
    }
}

// Setters

const atualizarListasQuestoes = ( action ) => {
    
    localStorage.setItem('listasQuestoes', JSON.stringify(action.payload));
    return action.payload;
}

const adicionarListaQuestoes = ( state, action ) => {

    localStorage.setItem('listasQuestoes', JSON.stringify([...state, action.payload]));        
    return [...state, action.payload];
}

const atualizarListaQuestoes = ( state, action ) => {

    const novoEstado = [...state];

    const indexLista = novoEstado.findIndex((lista) => lista.idDisciplina === action.payload.idDisciplina)
    
    novoEstado[indexLista].questoes = [...novoEstado[indexLista].questoes, action.payload.questoes]
    
    novoEstado[indexLista].qnt += 10;

    localStorage.setItem('listasQuestoes', JSON.stringify(novoEstado));
    
    return novoEstado;
}

const adicionarQuestao = ( state, action ) => {

    const novoEstado = [...state];

    const indexLista = novoEstado.findIndex((lista) => lista.idDisciplina === action.payload.idDisciplina)

    novoEstado[indexLista].questoes.push(action.payload.questao);

    novoEstado[indexLista].qnt++;

    localStorage.setItem('listasQuestoes', JSON.stringify(novoEstado));
    
    return novoEstado;
}


// Getters

const obterListaQuestoes = (state, idDisciplina) => {
    const lista = state.find(lista => lista.idDisciplina == idDisciplina);

    if(lista) {
        return lista.questoes;
    }

    return null;
}

const obterQuantidadeQuestoes = (state, idDisciplina) => {

    const lista = state.find(lista => lista.idDisciplina == idDisciplina);
    return lista.qnt;
}

const obterQuestao = (state, idDisciplina, idQuestao) => {

    const lista = state.find(lista => lista.idDisciplina == idDisciplina);
    const questao = lista.questoes.find(questao => questao.id = idQuestao)

    return questao;
}

export { reducerQuestoes, obterListaQuestoes, obterQuantidadeQuestoes, obterQuestao };


/*
    listasQuestoes = [
        {   
            idDisciplina, 
            qnt, 
            questoes: [ 
                {   
                    nome, 
                    id
                }, 
                {...} 
            ]
        },
        {...}
    ]

*/ 