import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAtomValue } from "jotai";
import { tokenAtom } from "./storages/authStorage";
import DiretorioStorage from "./storages/diretorioStorage";
import { checkRootDirectory } from "./utils/checkRootDirectory";
import RotaPrivada from "./components/gerais/rotaPrivada";
import Header from './components/gerais/Header';
import Home from './pages/Home';
import Editar from "./pages/Editar";
import CriarAvaliacao from "./pages/CriarAvaliacao";
import Corretor from "./pages/Corretor";
import Sobre from "./pages/Sobre";

function App() {

  //utilizando states globais tokenAtom e idDiretorioRaizAtom
  const token = useAtomValue(tokenAtom);
  const diretorioStorage = new DiretorioStorage();

  //useEffect: executa sempre que o componente App é montado
  useEffect(() => {
    //verificacao de existencia do diretorio raiz do app
      //se o ususario estiver autenticado
    if(token) {
      checkRootDirectory()
        .then(idDiretorio => {
          //atualiza state global isDiretorioAtom 
          diretorioStorage.atualizarDiretorioRaiz(idDiretorio);
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
