import { atom } from 'jotai';

const listasQuestoes = atom(JSON.parse(localStorage.getItem("listasQuestoes")) ?? []);

export const listasQuestoesAtom = atom(
    (get) => get(listasQuestoes),
    (get, set, param) => {
        const currentListasQuestoes = get(listasQuestoes);
        const updatedListasQuestoes = [...currentListasQuestoes, param];
    
        set(listasQuestoes, updatedListasQuestoes);
        localStorage.setItem('listasQuestoes', JSON.stringify(updatedListasQuestoes));
    },
)

export function adicionarQuestaoStorage(nome, idQuestao, idDisciplina) {

    const listas = JSON.parse(localStorage.getItem("listasQuestoes"));
    
    const i = listas.findIndex((lista) => lista.idDisciplina === idDisciplina);

    listas[i].questoes.push({
      nome: nome,
      id: idQuestao
    })
    
    localStorage.setItem('listasQuestoes', JSON.stringify(listas));

    return {lista: listas[i], indice: i};
}
