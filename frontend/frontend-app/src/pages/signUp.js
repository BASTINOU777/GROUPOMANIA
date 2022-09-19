import React from "react";
import SignUpForm from "../";// vers signup
import { Helmet } from "react-helmet";

const SignUp = () => {
  return (
    <>
      <Helmet>
        <title>Groupomania - Inscription</title>
      </Helmet>
      <div className="container-login">
        <TopLogoForm />
        <SignUpForm />
      </div>
    </>
  );
};

export default SignUp;