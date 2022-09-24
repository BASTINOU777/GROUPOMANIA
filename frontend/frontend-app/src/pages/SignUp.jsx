import { signUpFunction } from "../api/AuthAPI"
import { useForm } from "react-hook-form"
import React from "react";

function SignUp() {
  const submitManager = (data) => {
    if (data.password1 === data.password2) {
      signUpFunction(data);
      alert(
        "Merci pour votre inscription, vous pouvez maintenant vous connecter !"
      );
    } else {
      alert("les mots de passe doivent être identiques");
    }
  };

  const schema = {
    userName: {
      required: "Ce champ est requis",
      minLength: {
        value: 4,
        message: "Le pseudo doit contenir entre 4 et 20 caractères",
      },
      maxLength: {
        value: 20,
        message: "Le pseudo doit contenir entre 4 et 20 caractères",
      },
    },
    password: {
      required: "Ce champ est requis",
      minLength: {
        value: 8,
        message: "Le mot de passe doit contenir 8 caractères ou plus",
      },
    },
    email: {
      required: "Ce champ est requis",
      pattern: "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <main>
      <h1>Créer votre compte Groupomania</h1>
      <section>
        <article>
          <h2>Connectez-vous pour partager avec les autres membres</h2>
          <form id="submitForm" onSubmit={() => handleSubmit(submitManager)}>
            <div>
              <label htmlFor="userName">pseudo: </label>
              <br />
              <input
                type="string"
                {...register("userName", schema.userName)}
                placeholder="name"
              />
              {/* <p>{errors}</p> */}
            </div>
            <div>
              <label htmlFor="email">mail: </label>
              <br />
              <input
                type="email"
                {...register("email",schema.email)}
                placeholder="aaa@exemple.com"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password1">mot de passe: </label>
              <br />
              <input
                type="password"
                {...register("password1", schema.password)}
                placeholder="password"
              />
              {errors.password1 && <p>{errors.password1.message}</p>}
            </div>
            <div>
              <label htmlFor="password2">confirmer le mot de passe: </label>
              <br />
              <input
                type="password"
                {...register("password2", schema.password)}
                placeholder="password"
              />
              {errors.password2 && <p>{errors.password2.message}</p>}
            </div>
            <div>
              <button type="submit" className="button">
                S'inscrire
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  );
}
export default SignUp