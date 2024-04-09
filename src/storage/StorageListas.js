class StorageListas {

    // chave para consulta ao localhost
    storageKey;

    constructor(storageKey) {

        this.storageKey = storageKey;
    }

    reducer = ( state, action ) => {

        switch (action.type) {

            case 'atualizarStorage':

                return this.atualizarStorage(action);

            case 'adicionarLista':

                return this.adicionarLista(state, action);
            
            case 'atualizarLista':
    
                return this.atualizarLista(state, action);
    
            case 'adicionarElementoLista':
    
                return this.adicionarElementoLista(state, action);
    
            default:
                return state;
        }
    }

    //Setters

    atualizarStorage = ( action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
    }
    
    adicionarLista = ( state, action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify([...state, action.payload]));        
        return [...state, action.payload];
    }

    encontrarIndexLista = ( estado, action ) => {

        const indexLista = estado.findIndex((lista) => lista.idDisciplina === action.payload.idDisciplina)
        return indexLista;
    }
    
    atualizarLista = ( state, action ) => {
    
        const novoEstado = [...state]; 

        const indexLista = this.encontrarIndexLista( novoEstado, action );

        novoEstado[indexLista].lista = [...novoEstado[indexLista].lista, action.payload.lista]
        
        novoEstado[indexLista].qnt += action.payload.qnt;
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
        
        return novoEstado;
    }
    
    adicionarElementoLista = ( state, action ) => {
    
        const novoEstado = [...state]; 

        const indexLista = this.encontrarIndexLista( novoEstado, action );

        novoEstado[indexLista].lista.push(action.payload.elementoLista);
    
        novoEstado[indexLista].qnt++;
    
        localStorage.setItem(this.storageKey, JSON.stringify(novoEstado));
        
        return novoEstado;
    }
    
    //Getters

    obterValorInicial = () => {
        
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
        return storage ? storage : [];
    }

    encontrarLista = ( state, idDisciplina ) => {

        const lista = state.find(lista => lista.idDisciplina === idDisciplina)
        return lista;
    }

    obterLista = (state, idDisciplina) => {

        const lista = this.encontrarLista(state, idDisciplina);

        if(lista) {
            return lista.lista;
        }

        return null;
    }

    obterQuantidade = (state, idDisciplina) => {

        const lista = this.encontrarLista(state, idDisciplina);
        return lista.qnt;
    }

    obterElementoLista = (state, idDisciplina, idElementoLista) => {

        const lista = this.encontrarLista(state, idDisciplina);
        const elemento = lista.lista.find(el => el.id = idElementoLista)

        return elemento;
    }
}

export default StorageListas;