import { atom } from 'jotai';

export const idDiretorioRaizAtom = atom((JSON.parse(localStorage.getItem("IdDiretorioRaiz"))));

export const listaDisciplinasAtom = atom([]);