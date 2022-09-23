import { signUp } from "../api/AuthAPI"
import { useForm } from "react-hook-form";
import { React} from "react";

function SignUp() 
{
  const 
  {
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm();

  return (
    <main>
      <h1>Créer votre compte Groupomania</h1>
      <section>
        <article>
          <h2>Connectez-vous pour partager avec les autres membres</h2>
          <form id="submitForm" onSubmit={handleSubmit((data) => {
            if (data.password1 === data.password2) 
            {
              signUp(data);
              alert("Merci pour votre inscription, vous pouvez maintenant vous connecter !")
            }
            else
            {
              alert("les mots de passe doivent être identiques");
            }
          })}>
            <div >
              <label htmlFor="userName">pseudo: </label><br/>
              <input type="string" {...register("userName", 
              { 
                required: "Ce champ est requis", 
                minLength: 
                { 
                  value: 4,
                  message: "Le pseudo doit contenir entre 4 et 20 caractères"
                },
                maxLength: 
                { 
                  value: 20,
                  message: "Le pseudo doit contenir entre 4 et 20 caractères"
                } 
              })} 
              placeholder='name' />
              <p>{errors}</p>
            </div>
            <div >
              <label htmlFor="email">mail: </label><br/>
              <input type="email" {...register("email", 
              { required: "Ce champ est requis" })} 
              placeholder='aaa@exemple.com' />
              {errors && <p>{errors.email.message}</p>}
            </div>
            <div >
              <label htmlFor="password1">mot de passe: </label><br/>
              <input type="password" {...register("password1", 
              { 
                required: "Ce champ est requis", 
                minLength: 
                { 
                  value: 8,
                  message: "Le mot de passe doit contenir 8 caractères ou plus"
                }
              })} 
              placeholder='password' />
              {errors && <p>{errors.password1.message}</p>}
            </div>
            <div >
              <label htmlFor="password2">confirmer le mot de passe: </label><br/>
              <input type="password" {...register("password2", 
              { 
                required: "Ce champ est requis", 
              })} 
              placeholder='password' />
              {errors && <p>{errors.password1.message}</p>}
            </div>
            <div >
              <button type="submit" className="button">
                S'inscrire
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default SignUp