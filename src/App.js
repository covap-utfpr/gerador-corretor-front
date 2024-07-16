import { Routes, Route } from "react-router-dom";
import Header from './components/globals/Header';
import Home from './components/pages/Home';
import Edit from "./components/pages/Edit";
import Test from "./components/pages/Test";
import Corrector from './components/pages/Corrector'
import About from "./components/pages/About";
import PrivateRoute from "./components/globals/PrivateRoute";
import { SubjectListProvider } from "./contexts/SubjectListContex";
import { LoginProvider } from "./contexts/LoginContext";
import { CurrentTestProvider } from "./contexts/CurrentTestContext";
import { QuestionListsProvider } from "./contexts/QuestionListsContext";
import { CurrentQuestionProvider } from "./contexts/CurrentQuestionContext";
import { TestListsProvider } from "./contexts/TestListsContext";

function App() {
  
  return (
    <LoginProvider id="app">
      <Header/>
      <Routes>
        <Route path="/*"  element={
          <SubjectListProvider>
             <Routes>
                <Route path="/*"  element={
                  <TestListsProvider>
                  <CurrentTestProvider>
                  <QuestionListsProvider>
                  <CurrentQuestionProvider>
                  <Routes>
                    <Route exact path="/" element = { <Home /> } />    
                    <Route path="criar-avaliacao" element = { 
                      <PrivateRoute>
                        <Test action="create"/> 
                      </PrivateRoute> 
                    } />
                    <Route path="editar-avaliacao" element = { 
                      <PrivateRoute>
                        <Test action="edit"/> 
                      </PrivateRoute> 
                    } />
                    <Route path="editar" element = { 
                      <PrivateRoute>
                        <Edit /> 
                      </PrivateRoute> 
                    } />
                  </Routes>
                  </CurrentQuestionProvider>
                  </QuestionListsProvider>
                  </CurrentTestProvider>
                  </TestListsProvider>
                }/>
             </Routes>
          </SubjectListProvider>
        }/>
        <Route path="corretor" element = {  
          <PrivateRoute>
            <Corrector /> 
          </PrivateRoute>
        } />
        <Route path="sobre" element = { <About/> } />
      </Routes>
    </LoginProvider>
  );
}

export default App;


