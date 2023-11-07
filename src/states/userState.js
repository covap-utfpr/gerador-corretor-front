import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const tokenAtom = atom(Cookies.get("token"));