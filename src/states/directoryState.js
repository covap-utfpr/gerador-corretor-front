import { atom } from 'jotai';

export const idDiretorioPaiAtom = atom((JSON.parse(localStorage.getItem("IdDiretorioPai"))));

export const listaDisciplinasAtom = atom([]);