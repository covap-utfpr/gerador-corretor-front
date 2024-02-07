const reducerDiretorioRaiz = ( state, action ) => {
    
    switch (action.type) {

        case 'atualizarDiretorioRaiz':
            
            return atualizarDiretorioRaiz(action);

        default:
            return state;
    }
}

const atualizarDiretorioRaiz = (action) => {

    localStorage.setItem("idDiretorioRaiz", JSON.stringify(action.payload));
    return action.payload;
}

export default reducerDiretorioRaiz;

