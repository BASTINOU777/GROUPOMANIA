import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom"
// eslint-disable-next-line


import ConnectToBanner from "./components/Banner/ConnectToBanner"
import DisconnectToBanner from "./components/Banner/DisconnectToBanner"


import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import CreatePost from './pages/CreatPost'
import Logout from './pages/LogOut'
import PageNotFound from "./pages/PageNotfound"
import GetPermissions from "./api/AuthAPI"


//configuration de mon app, je récupére le token et le userName ds le LS
function App() 
{
  const token = localStorage.getItem('token');
let users = localStorage.getItem('username');
console.log(users);
  const [permissions, setPermissions] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
    {
      GetPermissions(token)
      .then((response) => {
        setPermissions(response);
      })
    }
  }, [])

  if (token) {
    // routes PATH
    return (
      <BrowserRouter>
        <ConnectToBanner />

        <Routes>
          <Route  path="/" element={<Home permissions={permissions}/>} />
          <Route  path="/profile/:pseudo" element={<Profile permissions={permissions} />} />
          <Route  path="/logout" element={<Logout />} />
          <Route path="/createPost" element={<CreatePost permissions={permissions} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <DisconnectToBanner />
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
