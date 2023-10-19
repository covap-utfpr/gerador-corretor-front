import { Routes, Route } from "react-router-dom";
import FormularioQuestao from './components/FormularioQuestao';
import Navbar from './components/Navbar';
import Home from './Home';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Home />} />     
          <Route path="/criar-questao" element={<FormularioQuestao />} />           
      </Routes>
    </div>
  );
}

export default App;
