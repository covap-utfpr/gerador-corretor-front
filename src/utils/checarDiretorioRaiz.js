import { criarUmDiretorio, lerUmDiretorio } from '../api/DirectoryCalls';

//verifica existencia do diretorio raiz do app
export async function checarDiretorioRaiz() {

    let idDiretorio = await lerUmDiretorio("Gerador-Corretor-Avaliacoes", "");
    
    if (idDiretorio.data) {
        //retorna id do diretorio raiz
        console.log("Diretorio pai ja existe");
        return idDiretorio.data;
    
    } else if (idDiretorio.error) {
        
        //cria novo diretorio raiz
        idDiretorio = await criarUmDiretorio("Gerador-Corretor-Avaliacoes");

        if(idDiretorio.data) {

            return idDiretorio.data;
        
        } else if (idDiretorio.error) {

           throw new Error("Pasta raiz nao pode ser criada");
        }
    }
}