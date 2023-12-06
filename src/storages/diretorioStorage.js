import { atom } from 'jotai';

const idDiretorioRaiz = atom(
    JSON.parse(localStorage.getItem("IdDiretorioRaiz"))
);

export const idDiretorioRaizAtom = atom(
    (get) => get(idDiretorioRaiz),
    (get, set, param) => {
      set(idDiretorioRaiz, param);
      localStorage.setItem('IdDiretorioRaiz', JSON.stringify(param));
    },
  )

const listaDisciplinas = atom(JSON.parse(localStorage.getItem("listaDisciplinas")) ?? []);

export const listaDisciplinasAtom = atom(
  (get) => get(listaDisciplinas),
  (get, set, param) => {
    set(listaDisciplinas, param);
    localStorage.setItem('listaDisciplinas', JSON.stringify(param));
  },
)

export function adicionarDisciplinaStorage(nome, id) {

  const disciplinas = JSON.parse(localStorage.getItem("listaDisciplinas"));

  disciplinas.push({
    nome: nome,
    id: id
  })

  return disciplinas;
}