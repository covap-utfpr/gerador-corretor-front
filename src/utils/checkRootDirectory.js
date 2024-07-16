import DirectoryCalls from "../api/DirectoryCalls";

//verifica existencia do diretorio raiz do app
async function checkRootDirectory() {

    const directoryCalls = new DirectoryCalls();

    let dirId = await directoryCalls.readDirectoryId({name: "Gerador-Corretor-Avaliacoes", parent: ""});
    
    if (dirId.data) {
        //retorna id do diretorio raiz
        console.log("Diretorio pai ja existe");
        return dirId.data;
    
    } else if (dirId.error) {
        
        //cria novo diretorio raiz
        dirId = await  directoryCalls.createDirectory({name: "Gerador-Corretor-Avaliacoes", parent: ""});

        if(dirId.data) 
            return dirId.data;
        else if (dirId.error)  
            throw new Error("Pasta raiz nao pode ser criada");   
    }
}

export default checkRootDirectory;