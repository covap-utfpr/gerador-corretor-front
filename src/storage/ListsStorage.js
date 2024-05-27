class ListsStorage {

    // chave para consulta ao localhost
    storageKey;

    constructor(storageKey) {

        this.storageKey = storageKey;
        this.baseValue = [];
    }

    reducer = ( state, action ) => {

        switch (action.type) {

            case 'updateStorage':

                return this.updateStorage(action);

            case 'addList':

                return this.addList(state, action);
            
            case 'updateList':
    
                return this.updateList(state, action);
    
            case 'addListElement':
    
                return this.addListElement(state, action);

            case 'deleteList':
    
                return this.deleteList(state, action);

            case 'deleteListElement':
            
                return this.deleteListElement(state, action);
      
            case 'deleteStorage': 

                return this.deleteStorage();

            default:
                return state;
        }
    }

    //Setters

    updateStorage = ( action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
    }
    
    addList = ( state, action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify([...state, action.payload]));        
        return [...state, action.payload];
    }

    findListIndex = ( estado, action ) => {

        const listIndex = estado.findIndex((list) => list.idDisciplina === action.payload.idDisciplina)
        return listIndex;
    }
    
    updateList = ( state, action ) => {
    
        const newState = [...state]; 

        const listIndex = this.findListIndex( newState, action );

        newState[listIndex].list = [...newState[listIndex].list, action.payload.list]
        
        newState[listIndex].qnt += action.payload.qnt;
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
        
        return newState;
    }
    
    addListElement = ( state, action ) => {
    
        const newState = [...state]; 

        const listIndex = this.findListIndex( newState, action );

        newState[listIndex].list.push(action.payload.element);
    
        newState[listIndex].qnt++;
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
        
        return newState;
    }
    
    deleteList = ( state, action ) => {

        const newState = [...state]; 

        const index = newState.findIndex(list => list.subjectId === action.payload);
    
        newState.splice(index, 1);
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    
        return newState;
    }

    deleteListElement = (state, action) => {

        const newState = [...state];

        const listIndex = this.findListIndex(newState, action);
    
        const elementIndex = newState[listIndex].list.findIndex((elemento) => elemento.id === action.payload.elementId);

        newState[listIndex].list.splice(elementIndex, 1);

        newState[listIndex].qnt--;

        localStorage.setItem(this.storageKey, JSON.stringify(newState));

        return newState;
    }

    deleteStorage = () => {

        localStorage.setItem(this.storageKey, JSON.stringify(this.baseValue));
        return this.baseValue;
    }

    //Getters

    getBaseValue = () => {
        
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
        return storage ? storage : this.baseValue;
    }

    findList = ( state, subjectId ) => {

        const list = state.find(list => list.subjectId === subjectId)
        return list;
    }

    getlist = (state, subjectId) => {

        const list = this.findList(state, subjectId);

        if(list) {
            return list.list;
        }

        return null;
    }

    getQuantity = (state, idDisciplina) => {

        const list = this.findList(state, idDisciplina);
        return list.qnt;
    }

    getListElement = (state, idDisciplina, idElementolist) => {

        const list = this.findList(state, idDisciplina);
        const elemento = list.list.find(el => el.id = idElementolist)

        return elemento;
    }
}

export default ListsStorage;