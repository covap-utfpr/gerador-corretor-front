import React, { createContext, useEffect, useReducer } from 'react';
import reducerLogin from '../../storage/loginStorage';
import reducerDiretorioRaiz from '../../storage/diretorioRaizStorage';
import reducerDisciplinas from '../../storage/disciplinasStorage';
import { reducerQuestoes } from '../../storage/questoesStorage';
import { reducerAvaliacoes } from '../../storage/avaliacoesStorage';
import { estadoInicialAvaliacaoAtual, reducerAvaliacaoAtual } from '../../storage/avaliacaoAtualStorage';
import { checkRootDirectory } from '../../utils/checkRootDirectory';

const GlobalContext = createContext();

const Global = ({ children }) => {
   
    const [ logado, dispatchLogado ] = useReducer(reducerLogin, true);
    const [ idDiretorioRaiz, dispatchDiretorioRaiz ] = useReducer(reducerDiretorioRaiz, JSON.parse(localStorage.getItem('idDiretorioRaiz')) || null); 
    const [ listaDisciplinas, dispatchListaDisciplinas ] = useReducer(reducerDisciplinas, JSON.parse(localStorage.getItem('listaDisciplinas')) || []); 
    const [ listasQuestoes, dispatchListasQuestoes ] = useReducer(reducerQuestoes, JSON.parse(localStorage.getItem('listasQuestoes')) || []);
    const [ listasAvaliacoes, dispatchListasAvaliacoes ] = useReducer(reducerAvaliacoes, JSON.parse(localStorage.getItem('listasAvaliacoes')) || []); 
    const [ avaliacaoAtual, dispatchAvaliacaoAtual ] = useReducer(reducerAvaliacaoAtual, estadoInicialAvaliacaoAtual());
    
    useEffect(() => {

        const verificaDiretorioRaiz = async () => {
            if (logado) {
                try {
                    const idDiretorio = await checkRootDirectory();
                    dispatchDiretorioRaiz({ type: 'atualizarDiretorioRaiz', payload: idDiretorio });
                } catch (error) {
                    console.log(error);
                }
            }
        };

        verificaDiretorioRaiz();
    }, []);

    return (
        <GlobalContext.Provider value={{ logado, dispatchLogado, idDiretorioRaiz, dispatchDiretorioRaiz, listaDisciplinas, dispatchListaDisciplinas, listasQuestoes, dispatchListasQuestoes, listasAvaliacoes, dispatchListasAvaliacoes, avaliacaoAtual, dispatchAvaliacaoAtual }}>    
            { children }
        </GlobalContext.Provider>
    );
};

export { GlobalContext, Global };


