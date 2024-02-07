const estadoInicialAvaliacaoAtual = () => {
    
    const storage = JSON.parse(localStorage.getItem('AvaliacaoAtual'));

    if(storage) {
        return storage
    }

    const inicial  = {
        questoes: [],
        configuracoes: {
            disposicaoQuestoes: "",
            posicaoGabarito: "",
            fonte: "",
            tamanhoFonte: 12,
            espacoRascunho: 0
        },
        cabecalho: {
            titulo: "",
            instituicao: "",
            disciplina: "",
            data: "",
            instrucoes: ""
        }
    };

    return inicial;
}


const reducerAvaliacaoAtual = ( state, action ) => {

    switch (action.type) {
  
        case 'atualizarAvaliacaoAtual':
            
            return atualizarAvaliacaoAtual(action);

        case 'adicionarQuestaoAvaliacaoAtual':

            return adicionarQuestaoAvaliacaoAtual(state, action);

        case 'adicionarCabecalho':
            
            return adicionarCabecalho(state, action);
        
        case 'adicionarConfiguracoes':
        
            return adicionarConfiguracoes(state, action);
            
        case 'atualizarQuestaoAvaliacaoAtual':

            return atualizarQuestaoAvaliacaoAtual(state, action);

        default:
            return state;
    }
}

//Setters
const atualizarAvaliacaoAtual = (action) => {
    
    localStorage.setItem('AvaliacaoAtual', JSON.stringify(action.payload));
    return action.payload;
}

const adicionarQuestaoAvaliacaoAtual = (state, action) => {
    
    const novoEstado = {...state};
    console.log(novoEstado)

    novoEstado.questoes.push(action.payload);

    localStorage.setItem('AvaliacaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

const adicionarCabecalho = (state, action) => {
    
    const novoEstado = {...state}

    novoEstado.cabecalho = action.payload;

    localStorage.setItem('AvaliacaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

const adicionarConfiguracoes = (state, action) => {
    
    const novoEstado = {...state}

    novoEstado.configuracoes = action.payload;

    localStorage.setItem('AvaliacaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

const atualizarQuestaoAvaliacaoAtual = (state, action) => {
    
    const novoEstado = {...state}

    const index = novoEstado.questoes.findIndex((questao) => questao.id === action.payload.id)

    if(action.payload.ordem) {
        novoEstado.questoes[index].ordem = action.payload.ordem;
    }
    
    if(action.payload.tipo) {
        novoEstado.questoes[index].tipo = action.payload.tipo;
    } 

    if(action.payload.valor) {
        novoEstado.questoes[index].valor = action.payload.valor;
    }

    localStorage.setItem('AvaliacaoAtual', JSON.stringify(novoEstado));

    return novoEstado;
}

//Getters

export { reducerAvaliacaoAtual, estadoInicialAvaliacaoAtual };


/*
    AvaliacaoAtual = {
        questoes: [
            {   
                nome,
                id,
                ordem,
                tipo,
                valor,
                ...
            },
            {...}
        ],
        configuracoes: {
            disposicaoQuestoes,
            posicaoGabarito,
            fonte,
            tamanhoFonte,
            espacoRascunho
        },
        cabecalho: {
            titulo,
            instituicao,
            disciplina,
            data,
            instrucoes
        }
    }
*/
