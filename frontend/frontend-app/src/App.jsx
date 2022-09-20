import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


import ConnectToBanner from "./components/Banner/ConnectToBanner"
import DisconnectToBanner from "./components/Banner/DisconnectToBanner"


import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

import CreateOnePost from './pages/post/CreateOnePost'
import CreatePost from './pages/post/CreatPost'

import PageNotFound from "./pages/PageNotfound"


//configuration de mon app, récupére le token et donne les permissions
function App() 
{
  const token = localStorage.getItem('token');

  const [permissions, setPermissions] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token)
    {
      getPermissionsFunction(token)
      .then((response) => {
        setPermissions(response);
      })
    }
  }, [])

  if (token) {
    // routes PATH
    return (
      <Router>
        <ConnectToBanner />

        <Routes>
          <Route exact path="/" element={<Home permissions={permissions}/>} />
          <Route exact path="/profile/:pseudo" element={<Profile permissions={permissions} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createPost" element={<CreatePost permissions={permissions} />} />
          <Route exact path="/post/:id" element={<CreateOnePost permissions={permissions} />} />

          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <DisconnectToBanner />
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="signin" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App;
