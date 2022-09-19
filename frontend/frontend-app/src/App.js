import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/log-page";
import Home from "./pages/home";
import Profil from "./pages/profil";
import axios from "axios";
import Moderation from "./pages/admin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/moderation" element={<Moderation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
