import CurrentTest from "../models/CurrentTest";

class CurrentTestStorage {

    storageKey;

    constructor(storageKey) {

        this.storageKey = storageKey;
        this.baseValue = new CurrentTest("", "", "", "", "", 0, 0, "", 0, 0);
    }

    reducer = ( state, action ) => {

        switch (action.type) {

            case 'updateStorage':

                return this.updateStorage(action);
    
            case 'addQuestion':
    
                return this.addQuestion(state, action);
    
            case 'updateSection':
                
                return this.updateSection(state, action);
                
            case 'updateQuestion':
    
                return this.updateQuestion(state, action);
            
            case 'deleteSubjectList':

                return this.deleteSubjectList(state, action);
            
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

    updateSection = ( state, action ) => {
  
        const newState = {...state}

        newState[action.payload.section][action.payload.prop] = action.payload.content;
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    
        return newState;    
    }

    addQuestion = ( state, action ) => {
    
        const newState = {...state};
    
        newState.questions.push(action.payload);
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    
        return newState;
    }
    
    updateQuestion = (state, action) => {
        
        const newState = {...state}
    
        const index = action.payload.index;
    
        if(action.payload.ordem) {
            newState.questions[index].order = action.payload.order;
        }
        
        if(action.payload.tipo) {
            newState.questions[index].type = action.payload.type;
        } 
    
        if(action.payload.valor) {
            newState.questions[index].value = action.payload.value;
        }
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    
        return newState;
    }

    deleteSubjectList = (state, action) => {
        
        const newState = {...state}
        
        let index = 0;

        while (index != -1) {

            index = newState.questions.findIndex(questao => questao.subjectId == action.payload);
            newState.questions.splice(index, 1);        
        }
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    }
    
    deleteStorage = () => {

        localStorage.setItem(this.storageKey, JSON.stringify(this.baseValue));
        return this.baseValue;
    }

    // Getters
    getBaseValue = () => {
    
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
    
        return storage ? storage : this.baseValue;
    }
}


export default CurrentTestStorage;


