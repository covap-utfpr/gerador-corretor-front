class StorageDiretorioRaiz {
    
    storageKey;

    constructor() {

        this.storageKey = "idDiretorioRaiz";
        this.atualizarDiretorioRaiz = this.atualizarDiretorioRaiz.bind(this);
        this.valorBase = "";
    }
    
    reducer = (state, action) => {
    
        switch (action.type) {
    
            case 'atualizarDiretorioRaiz':

                return this.atualizarDiretorioRaiz(action);

            case 'deletarStorage': 

                return this.deletarStorage();
                
            default:
                return state;
        }
    }
    
    atualizarDiretorioRaiz = (action) => {
    
        localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
        return action.payload;
    }

    //Getters
    obterValorInicial = () => {
        
        const storage = JSON.parse(localStorage.getItem(this.storageKey));
        return storage ? storage : this.valorBase;
    }

    deletarStorage = () => {

        localStorage.setItem(this.storageKey, JSON.stringify(this.valorBase));
        return this.valorBase;
    }
}


export default StorageDiretorioRaiz;


