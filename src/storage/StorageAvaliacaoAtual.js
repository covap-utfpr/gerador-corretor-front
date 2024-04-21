import AvaliacaoAtual from "../modelos/AvaliacaoAtual";

class StorageAvaliacaoAtual {

    storageKey;

    constructor() {

        this.storageKey = "AvaliacaoAtual";
    }

    reducer = ( state, action ) => {

        switch (action.type) {
      
            case 'atualizarStorage':

                return this.atualizarStorage(action);
    
            case 'adicionarQuestao':
    
                return this.adicionarQuestao(state, action);
    
            case 'adicionarSecao':
                
                return this.adicionarSecao(state, action);
                
            case 'atualizarQuestao':
    
                return this.atualizarQuestao(state, action);
            
            case 'excluirQuestoesDisciplina':

                return this.excluirQuestoesDisciplina(state, action);
    
            default:
                return state;
        }
    }

    //Setters
    atualizarStorage = ( action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
    }

    adicionarSecao = ( state, action ) => {
  
        const novoEstado = {...state}

        novoEstado[action.payload.secao] = action.payload.conteudo;
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
    
        return novoEstado;    
    }

    adicionarQuestao = ( state, action ) => {
    
        const novoEstado = {...state};
    
        novoEstado.questoes.push(action.payload);
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
    
        return novoEstado;
    }
    
    atualizarQuestao = (state, action) => {
        
        const novoEstado = {...state}
    
        const index = action.payload.index;
    
        if(action.payload.ordem) {
            novoEstado.questoes[index].ordem = action.payload.ordem;
        }
        
        if(action.payload.tipo) {
            novoEstado.questoes[index].tipo = action.payload.tipo;
        } 
    
        if(action.payload.valor) {
            novoEstado.questoes[index].valor = action.payload.valor;
        }
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
    
        return novoEstado;
    }

    excluirQuestoesDisciplina = (state, action) => {
        
        const novoEstado = {...state}
        
        let index = 0;

        while (index != -1) {

            index = novoEstado.questoes.findIndex(questao => questao.idDisciplina == action.payload);
            novoEstado.questoes.splice(index, 1);        
        }
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
    }

    // Getters
    obterValorInicial = () => {
    
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
    
        return storage ? storage : new AvaliacaoAtual("", "", "", "", "", 0, "", "", "", "", "");
    }
    
}

export default StorageAvaliacaoAtual;


