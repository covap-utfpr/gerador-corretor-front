class RootDirectoryStorage {
    
    storageKey;

    constructor() {

        this.storageKey = "rootDirectoryId";
        this.updateStorage = this.updateStorage.bind(this);
        this.baseValue = "";
    }
    
    reducer = (state, action) => {
    
        switch (action.type) {
    
            case 'updateStorage':

                return this.updateStorage(action);

            case 'deleteStorage': 

                return this.deleteStorage();
                
            default:
                return state;
        }
    }

    //Setters
    updateStorage = (action) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
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
}


export default RootDirectoryStorage;


