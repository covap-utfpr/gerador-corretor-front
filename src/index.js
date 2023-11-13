import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//importando estilos globais e App
//import "./styles/index.css";
import './styles/index.scss';
import App from "./App";

//selecionando raiz do index e renderizando App dentro
ReactDOM.createRoot(document.getElementById("root")).render(
  //renderiz app 2 vezes
  //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</React.StrictMode>
);