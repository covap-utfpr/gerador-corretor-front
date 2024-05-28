import { Routes, Route } from "react-router-dom";
import Header from './components/gerais/Header';
import Home from './components/pages/Home';
import Editar from "./components/pages/Edit";
import Test from "./components/pages/Test";
import Corretor from './components/pages/Corretor'
import Sobre from "./components/pages/Sobre";
import { Global } from "./components/gerais/Global";
import PrivateRoute from "./components/globals/PrivateRoute";
import { SubjectListProvider } from "./contexts/SubjectListContex";
import { LoginProvider } from "./contexts/LoginContext";
import { CurrentTestProvider } from "./contexts/CurrentTestContext";
import { QuestionListsProvider } from "./contexts/QuestionListsContext";
import { CurrentQuestionProvider } from "./contexts/CurrentQuestionContext";

function App() {
  
  return (
    <LoginProvider id="app">
      <Header/>
      <Routes>
        <Route path="/*"  element={
          <SubjectListProvider>
             <Routes>
                <Route path="/*"  element={
                  <TestListsContext><CurrentTestProvider><QuestionListsProvider><CurrentQuestionProvider>
                    <Route exact path="/" element = { <Home /> } />    
                    <Route path="criar-avaliacao" element = { 
                      <PrivateRoute>
                        <CriarAvaliacao /> 
                      </PrivateRoute> 
                    } />
                    <Route path="editar-avaliacao" element = { 
                      <PrivateRoute>
                        <CriarAvaliacao /> 
                      </PrivateRoute> 
                    } />
                    <Route path="editar" element = { 
                      <PrivateRoute>
                        <Editar /> 
                      </PrivateRoute> 
                    } />
                  </CurrentQuestionProvider></QuestionListsProvider></CurrentTestProvider></TestListsContext>
                }/>
             </Routes>
          </SubjectListProvider>
        }/>
        <Route path="corretor" element = {  
          <PrivateRoute>
            <Corretor /> 
          </PrivateRoute>
        } />
        <Route path="sobre" element = { <Sobre /> } />
      </Routes>
    </LoginProvider>
  );
}

export default App;


