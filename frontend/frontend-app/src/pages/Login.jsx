import { login } from "../api/AuthAPI"
import { useForm } from "react-hook-form"
import React from "react";

function Login() 
{
  const {
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm({
    defaultValues:{
      email:"",
      password:""
    }
  });
  function submitForm(data)
  {
    login(data)
    .then((response) => 
    {
      if (response.token) 
      {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('is_admin',response.is_admin);

        /*
        let text = 'coucou bastien'
        text = 'coucou ' + 'bastien'
        
        const prenom = 'bastien'
        text = 'coucou ' + prenom

        text = `coucou ${prenom}`

        const article = `<article>
          <p>Coucou ${prenom}</p>
        </article>`

        document.getElementById('ancre').innerHTML = article;
      */

        
        window.location.replace(`/profile/${response.username}`);
        // console.log(response.userInfos)
      }
      else
      {
        return console.log(errors);
      }
    })
  }
//render
  return (
    <main>
      <h1>Se connecter à Groupomania</h1>
      <section>
        <article>
          <h2>Connectez-vous pour voir plus de contenu ou en partager</h2>
          <form
            id="submitForm"
            onSubmit={handleSubmit((data) => {
              submitForm(data);
            })}
          >
            <div>
              <label htmlFor="email">mail: </label>
              <br />
              <input
                type="email"
                {...register("email", { required: "Ce champ est requis" })}
                placeholder="aaa@exemple.com"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password">mot de passe: </label>
              <br />
              <input
                type="password"
                {...register("password", {
                  required: "Ce champ est requis",
                  minLength: {
                    value: 8,
                    message:
                      "Le mot de passe doit contenir au moins 8 caractères",
                  },
                })}
                placeholder="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
              <button type="submit" className="button">
                Se connecter
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default Login

