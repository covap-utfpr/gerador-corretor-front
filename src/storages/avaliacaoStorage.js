import { atom } from 'jotai';

const questoesAvaliacao = atom(JSON.parse(localStorage.getItem("questoesAvaliacao")) ?? []);

export const questoesAvaliacaoAtom = atom(
    (get) => get(questoesAvaliacao),
    (get, set, param) => {
        const current = get(questoesAvaliacao);
        const updated = [...current, param];
    
        set(questoesAvaliacao, updated);
        localStorage.setItem('questoesAvaliacao', JSON.stringify(updated));
    },
)