import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAtomValue , useSetAtom } from "jotai";
import { tokenAtom } from "./states/userState";
import { idDiretorioPaiAtom } from "./states/directoryState";

import { checkRootDirectory } from "./utils/checkRootDirectory";
import RotaPrivada from "./components/rotaPrivada";
import Header from './components/Header';
import Home from './pages/Home';
import Editar from "./pages/Editar";
import CriarAvaliacao from "./pages/CriarAvaliacao";
import Corretor from "./pages/Corretor";
import Sobre from "./pages/Sobre";

function App() {

  //utilizando states globais tokenAtom e idDiretorioPaiAtom
  const token = useAtomValue(tokenAtom);
  const setIdDiretorio = useSetAtom(idDiretorioPaiAtom);

  //useEffect: executa sempre que o componente App é montado
  useEffect(() => {
    //verificacao de existencia do diretorio raiz do app
      //se o ususario estiver autenticado
    if(token) {
      checkRootDirectory()
        .then(idDiretorio => {
          //atualiza state global isDiretorioAtom 
          setIdDiretorio(idDiretorio);
          //atualiza o localStorage
          localStorage.setItem("IdDiretorioPai", JSON.stringify(idDiretorio));
        })
        .catch(error => {
          console.log(error);
        })
    }
  });
  
  return (
    <div>
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />     
          <Route 
            path="criar-avaliacao"
            element={
              <RotaPrivada isAuthenticated={token}>
                <CriarAvaliacao />
              </RotaPrivada>
            }
          />
          <Route 
            path="editar"
            element={
              <RotaPrivada isAuthenticated={token}>
                <Editar />
              </RotaPrivada>
            }
          />
          <Route 
            path="corretor"
            element={
              <RotaPrivada isAuthenticated={token}>
                <Corretor />
              </RotaPrivada>
            }
          />
          <Route 
            path="sobre"
            element={
              <RotaPrivada isAuthenticated={token}>
                <Sobre />
              </RotaPrivada>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
