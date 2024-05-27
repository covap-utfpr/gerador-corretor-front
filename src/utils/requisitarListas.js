import { lerVariasAvaliacoes } from "../api/testeCalls";
import { lerVariasQuestoes } from "../api/questionCalls";

export const requisitarListas = async (listaDisciplinas, entidade) => {

    const listasPromises = listaDisciplinas.map( async (disciplina) => {

        let res;

        if(entidade == "questao") {
            res = await lerVariasQuestoes(disciplina.id, 0);
        } else if (entidade == "avaliacao") {
            res = await lerVariasAvaliacoes(disciplina.id, 0);
        }

        if(res.data) {

            const lista = {
                idDisciplina: disciplina.id,
                qnt: res.data.length,
                lista: res.data
            }

            return lista;

        } else if (res.error) {
    
            const lista = {
                idDisciplina: disciplina.id,
                qnt: 0,
                lista: []
            }

            return lista;
        } 
    });

    const listas = await Promise.all(listasPromises);
    
    const listasFiltradas = listas.filter(lista => lista !== undefined);

    return listasFiltradas;
}
