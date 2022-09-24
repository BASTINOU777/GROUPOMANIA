import React from "react";
import { createRoot } from 'react-dom/client';
import "./styles/index.css"

import App from "./App";


//render qui vient chercher root et qui vient lui greffer l'app
const root = createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <App/>
    </React.StrictMode>
    

 
  );
