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

