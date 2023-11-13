import { postDiretorio, readDiretorio } from '../api/diretorio';

//verifica existencia do diretorio raiz do app
export async function checkRootDirectory() {

    let idDiretorio = await readDiretorio("Gerador-Corretor-Avaliacoes");
    
    if (idDiretorio.data) {
        //retorna id do diretorio raiz
        console.log("Diretorio pai ja existe");
        return idDiretorio.data;
    
    } else if (idDiretorio.error) {
        
        //cria novo diretorio raiz
        idDiretorio = await postDiretorio("Gerador-Corretor-Avaliacoes");

        if(idDiretorio.data) {

            return idDiretorio.data;
        
        } else if (idDiretorio.error) {

           throw new Error("Pasta raiz nao pode ser criada");
        }
    }
}