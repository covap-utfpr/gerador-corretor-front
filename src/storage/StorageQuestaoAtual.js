import Questao from "../modelos/Questao";

class StorageQuestaoAtual {

    storageKey;

    constructor() {

        this.storageKey = "QuestaoAtual";
    }

    reducer = ( state, action ) => {

        switch (action.type) {
      
            case 'atualizarStorage':

                return this.atualizarStorage(action);
    
            case 'adicionarSecao':
            
                return this.adicionarSecao(state, action);
            
            case 'atualizarAlternativa':
    
                return this.atualizarAlternativa(state, action);
    
            default:
                return state;
        }
    }

    // Setters

    atualizarStorage = ( action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
    }

    atualizarAlternativa = (state, action) => {
    
        const novoEstado = {...state}
    
        novoEstado.alternativas[+action.payload.id] = action.payload.alternativa;
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
    
        return novoEstado;
    }    

    adicionarSecao = ( state, action ) => {
  
        const novoEstado = {...state}

        novoEstado[action.payload.secao] = action.payload.conteudo;
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
    
        return novoEstado;    
    }

    // Getters
    
    obterValorInicial = () => {
    
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
    
        return storage ? storage : new Questao("", "", "", ["","","","",""], "", "");
    }
}

export default StorageQuestaoAtual;
