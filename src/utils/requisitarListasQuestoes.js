import { lerVariasQuestoes } from "../api/questao";

export const requisitarListasQuestoes = async (listaDisciplinas) => {

    const listasQuestoesPromises = listaDisciplinas.map( async (disciplina) => {

        const listaQuestoes = await lerVariasQuestoes(disciplina.id, 0);
        
        if(listaQuestoes.data) {

            const lista = {
                idDisciplina: disciplina.id,
                qnt: listaQuestoes.data.length,
                questoes: listaQuestoes.data
            }

            return lista;

        } else if (listaQuestoes.error) {
    
            console.error(listaQuestoes.error);
        } 
    });

    const listasQuestoes = await Promise.all(listasQuestoesPromises);
    
    const listasQuestoesFiltradas = listasQuestoes.filter(lista => lista !== undefined);

    return listasQuestoesFiltradas;
}
