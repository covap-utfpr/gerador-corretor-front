const reducerAvaliacoes = ( state, action ) => {
    
    switch (action.type) {
  
        case 'atualizarListasAvaliacoes':

            return atualizarListasAvaliacoes(action);

        case 'adicionarListaAvaliacoes':

            return adicionarListaAvaliacoes(state, action);

        case 'atualizarListaAvaliacoes':
            
            return atualizarListaAvaliacoes(state, action);

        case 'adicionarAvaliacao':

            return adicionarAvaliacao(state, action);

        default:
            return state;
    }
}

// Setters

const atualizarListasAvaliacoes = (action) => {
    
    localStorage.setItem('listasAvaliacoes', JSON.stringify(action.payload));
    return action.payload;
}

const adicionarListaAvaliacoes = (state, action) => {
    
    localStorage.setItem('listasAvaliacoes', JSON.stringify([...state, action.payload]));    
    return [...state, action.payload];
}

const atualizarListaAvaliacoes = (state, action) => {
    
    const novoEstado = [...state];

    const indexLista = novoEstado.findIndex((lista) => lista.idDisciplina === action.payload.idDisciplina)
    
    novoEstado[indexLista].avaliacoes = [...novoEstado[indexLista].avaliacoes, action.payload.avaliacoes]
    
    novoEstado[indexLista].qnt += 10;

    localStorage.setItem('listasAvaliacoes', JSON.stringify(novoEstado));
    
    return novoEstado;
}

const adicionarAvaliacao = (state, action) => {
    
    const novoEstado = [...state];

    const indexLista = novoEstado.findIndex((lista) => lista.idDisciplina === action.payload.idDisciplina)

    novoEstado[indexLista].avaliacoes.push(action.payload.avaliacao);

    novoEstado[indexLista].qnt++;

    localStorage.setItem('listasAvaliacoes', JSON.stringify(novoEstado));
    
    return novoEstado;
}

// Getters

const obterListaAvaliacoes = (state, idDisciplina) => {

    const lista = state.find(lista => lista.idDisciplina == idDisciplina);

    return lista.avaliacoes;
}

const obterQuantidadeAvaliacoes = (state, idDisciplina) => {

    const lista = state.find(lista => lista.idDisciplina == idDisciplina);

    return lista.qnt;
}

const obterAvaliacao = (state, idDisciplina, idAvaliacao) => {

    const lista = state.find(lista => lista.idDisciplina == idDisciplina);

    const avaliacao = lista.avaliacoes.find(avaliacao => avaliacao.id = idAvaliacao)

    return avaliacao;
}
  
export { reducerAvaliacoes, obterListaAvaliacoes, obterQuantidadeAvaliacoes, obterAvaliacao };


/*
    listasAvaliacoes = [
        {   
            idDisciplina, 
            qnt, 
            avaliacoes: [ 
                {   
                    nome, 
                    id, 
                }, 
                {...} 
            ]
        },
        {...}
    ]

*/ 