import React, { createContext, useEffect, useReducer } from 'react';
import { checkRootDirectory } from '../../utils/checkRootDirectory';
import StorageDisciplina from '../../storage/StorageDisciplina';
import StorageLogin from '../../storage/StorageLogin';
import StorageListas from '../../storage/StorageListas';
import StorageDiretorioRaiz from '../../storage/StorageDiretorioRaiz';
import StorageAvaliacaoAtual from '../../storage/StorageAvaliacaoAtual';

const GlobalContext = createContext();

const Global = ({ children }) => {

    const storageLogin = new StorageLogin();
    const storageDiretorioRaiz = new StorageDiretorioRaiz();
    const storageDisciplina = new StorageDisciplina();
    const storageListasQuestoes = new StorageListas('listasQuestoes');
    const storageListasAvaliacoes = new StorageListas('listasAvaliacoes');
    const storageAvaliacaoAtual = new StorageAvaliacaoAtual();
   
    const [ logado, dispatchLogado ] = useReducer(storageLogin.reducer, true);
    const [ idDiretorioRaiz, dispatchDiretorioRaiz ] = useReducer(storageDiretorioRaiz.reducer, storageDiretorioRaiz.obterValorInicial());
    const [ listaDisciplinas, dispatchListaDisciplinas ] = useReducer(storageDisciplina.reducer, storageDisciplina.obterValorInicial()); 
    const [ listasQuestoes, dispatchListasQuestoes ] = useReducer(storageListasQuestoes.reducer, storageListasQuestoes.obterValorInicial());
    const [ listasAvaliacoes, dispatchListasAvaliacoes ] = useReducer(storageListasAvaliacoes.reducer,  storageListasAvaliacoes.obterValorInicial()); 
    const [ avaliacaoAtual, dispatchAvaliacaoAtual ] = useReducer(storageAvaliacaoAtual.reducer, storageAvaliacaoAtual.obterValorInicial());
    
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


