import { Routes, Route } from "react-router-dom";
import Header from './components/gerais/Header';
import Home from './components/pages/Home';
import Editar from "./components/pages/Editar";
import CriarAvaliacao from "./components/pages/CriarAvaliacao";
import Corretor from './components/pages/Corretor'
import Sobre from "./components/pages/Sobre";
import { Global } from "./components/gerais/Global";
import RotaPrivada from "./components/gerais/rotaPrivada";


function App() {
  
  return (
    <Global id="app">
      <Header/>
      <Routes>
          <Route exact path="/" element = { <Home /> } />     
          <Route path="criar-avaliacao" element = { 
            <RotaPrivada>
              <CriarAvaliacao /> 
            </RotaPrivada> 
          } />
          <Route path="editar" element = { 
            <RotaPrivada>
              <Editar /> 
            </RotaPrivada> 
          } />
          <Route path="corretor" element = {  
            <RotaPrivada>
              <Corretor /> 
            </RotaPrivada>
          } />
          <Route path="sobre" element = { <Sobre /> } />
      </Routes>
    </Global>
  );
}

export default App;


