import { Routes, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import RotaPrivada from "./components/rotaPrivada";
import Header from './components/Header';
import Home from './pages/Home';
import Editar from "./pages/Editar";
import CriarAvaliacao from "./pages/CriarAvaliacao";
import Corretor from "./pages/Corretor";
import Sobre from "./pages/Sobre";

function App() {

  //Verificando presença do token de autenticaçao
  const isAuthenticated = Cookies.get("token");
  
  return (
    <div>
      <Header />
      <Routes>
          <Route exact path="/" element={<Home />} />     
          <Route 
            path="criar-avaliacao"
            element={
              <RotaPrivada isAuthenticated={isAuthenticated}>
                <CriarAvaliacao />
              </RotaPrivada>
            }
          />
          <Route 
            path="editar"
            element={
              <RotaPrivada isAuthenticated={isAuthenticated}>
                <Editar />
              </RotaPrivada>
            }
          />
          <Route 
            path="corretor"
            element={
              <RotaPrivada isAuthenticated={isAuthenticated}>
                <Corretor />
              </RotaPrivada>
            }
          />
          <Route 
            path="sobre"
            element={
              <RotaPrivada isAuthenticated={isAuthenticated}>
                <Sobre />
              </RotaPrivada>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
