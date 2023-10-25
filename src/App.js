import { Routes, Route } from "react-router-dom";
import FormularioQuestao from './components/FormularioQuestao';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RotaPrivada from "./components/rotaPrivada";
import Cookies from 'js-cookie';

function App() {

  //Verificando presença do token de autenticaçao
  const isAuthenticated = Cookies.get("token");
  
  return (
    <div>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Home />} />     
          <Route 
            path="criar-questao"
            element={
              <RotaPrivada isAuthenticated={isAuthenticated}>
                <FormularioQuestao />
              </RotaPrivada>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
