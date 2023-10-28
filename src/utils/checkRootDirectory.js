import { postDiretorio, readDiretorio } from '../api/diretorio';

//verifica existencia do diretorio raiz do app
export async function checkRootDirectory() {

    let idDiretorio = await readDiretorio("Gerador-Corretor-Avaliacoes");
    
    if (idDiretorio.data) {

        console.log("Pasta raiz ja existe");

        //retorna id do diretorio raiz
        return idDiretorio.data;
    
    } else if (idDiretorio.error) {
        
        //cria novo diretorio raiz
        idDiretorio = await postDiretorio("Gerador-Corretor-Avaliacoes");

        if(idDiretorio.data) {

            console.log("Pasta raiz criada");
            return idDiretorio.data;
        
        } else if (idDiretorio.error) {

            console.error("Pasta raiz nao pode ser criada");

        }
    }
}