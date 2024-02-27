import Questao from "../modelos/Questao";

const estadoInicialQuestaoAtual = () => {
    
    const storage = JSON.parse(localStorage.getItem('QuestaoAtual'));

    return storage ? storage : new Questao("", "", "", [], "", "");
}


const reducerQuestaoAtual = ( state, action ) => {

    switch (action.type) {
  
        case 'atualizarQuestaoAtual':
            
            return atualizarQuestaoAtual(action);

        case 'atualizarIdDisciplina':

            return atualizarIdDisciplina(state, action);

        case 'adicionarTitulo':
            
            return adicionarTitulo(state, action);
        
        case 'adicionarEnunciado':
        
            return adicionarEnunciado(state, action);
            
        case 'atualizarAlternativa':

            return atualizarAlternativa(state, action);

        default:
            return state;
    }
}

//Setters
const atualizarQuestaoAtual = (action) => {
    
    localStorage.setItem('QuestaoAtual', JSON.stringify(action.payload));
    return action.payload;
}

const atualizarIdDisciplina = (state, action) => {

    const novoEstado = {...state}

    novoEstado.idDisciplina = action.payload;

    localStorage.setItem('QuestaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

const adicionarTitulo = (state, action) => {
    
    const novoEstado = {...state}

    novoEstado.titulo = action.payload;

    localStorage.setItem('QuestaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

const adicionarEnunciado = (state, action) => {
    
    const novoEstado = {...state}

    novoEstado.enunciado = action.payload;

    localStorage.setItem('QuestaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

const atualizarAlternativa = (state, action) => {
    
    const novoEstado = {...state}

    const index = novoEstado.alternativas.findIndex((alternativa) => alternativa.id === action.payload.id)

    if(index) {
        novoEstado.alternativa[index] = action.payload.alternativa;
    } else {
        novoEstado.alternativas.push(action.payload.alternativa);
    }

    localStorage.setItem('QuestaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}


//Getters

export { reducerQuestaoAtual, estadoInicialQuestaoAtual };
