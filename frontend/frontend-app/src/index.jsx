import "./styles/index.css"
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


//render qui vient chercher root et qui vient lui greffer l'app
ReactDOM.render(
  <React.StrictMode>
    <App />
    </React.StrictMode>,

  document.getElementById("root")
  );
