import Question from "../models/Question";

class CurrentQuestionStorage {

    storageKey;

    constructor(storageKey) {

        this.storageKey = storageKey;
        this.baseValue = new Question("", "", "", [], "", "");
    }

    reducer = ( state, action ) => {

        switch (action.type) {
      
            case 'updateStorage':

                return this.updateStorage(action);
    
            case 'addSection':
            
                return this.addSection(state, action);
            
            case 'updateAlternative':
    
                return this.updateAlternative(state, action);
      
            case 'deleteStorage': 

                return this.deleteStorage();
      
            default:
                return state;
        }
    }

    // Setters

    updateStorage = ( action ) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
    }

    updateAlternative = (state, action) => {
    
        const newState = {...state}
    
        newState.alternatives[+action.payload.id] = action.payload.alternative;
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    
        return newState;
    }    

    addSection = ( state, action ) => {
  
        const newState = {...state}

        newState[action.payload.section] = action.payload.content;
    
        localStorage.setItem(this.storageKey, JSON.stringify(newState));
    
        return newState;    
    }

    deleteStorage = () => {

        localStorage.setItem(this.storageKey, JSON.stringify(this.baseValue));
        return this.baseValue;
    }

    // Getters
    
    getBaseValue = () => {
    
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
    
        return storage ? storage : this.baseValue;
    }
}

export default CurrentQuestionStorage;
