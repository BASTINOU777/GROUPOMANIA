import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { getProfile, updateProfile, deleteProfile } from "../api/UserAPI"

function Profile({permissions}) 
{
  const [user, setList] = useState([]);
  let profile = JSON.parse(localStorage.getItem('user')) ;
  
  //rendering pour aller chercher les infos des users dans le DB
  useEffect(() => {
    let userName = window.location.href.split("profile/").pop();
    getProfile(userName)
    .then((response) => {
      setList(response);
    })
  }, [])
  
  //rendering pour que les defaultValues du formulaire prennent la réponse de getProfileFunction
  useEffect(() => {
    reset({
      userName: `${user.userName}`,
      email: `${user.email}`
    }); 
  }, [user])

  //au clic sur le bouton "modifier profil", fonction de mise à jour du profil et reload de la page
  function submitForm(data)
  {
    updateProfile(data)
    .then((response) => 
    {
      profile.userName = response.userName ;
      profile.email = response.email ;
      localStorage.setItem('user', JSON.stringify(profile));
      alert("Le profil a bien été modifié");
      window.location.reload();
      window.location.replace(`/profile/${response.userName}`);
    })
  }

  //fonction de suppression du profil ( au clik du boutton suppression du profil) et reload sur la page de déconnexion 
  function deleteUser(data)
  {
    deleteProfile(data)
    .then((response) => 
    {
      window.location.reload();
      window.location.replace(`/logout`);
    })
  }
  //appel des éléments du formulaire
  const 
  { register, handleSubmit, formState: {errors}, reset } = useForm(
    {
      defaultValues:
      {
        userName: `${user.userName}`,
        email: `${user.email}`,
      }
    });

  if (user.userId === permissions.userId || permissions.admin === 1) 
  {
    return (
      <main>
        <h1>Gérer mon compte</h1>
        <section>
          <article>
            <h2>Paramètres du compte</h2>
            <form id="submitForm" onSubmit={handleSubmit((data) => {
                data.lastPseudo = user.userName;
                submitForm(data);
              })}>
                <div >
                  <label htmlFor="userName">Pseudo: </label><br/>
                  <input type="text" {...register("userName", 
                  { 
                    minLength: 
                    { 
                      value: 4,
                      message: "Le userName doit contenir entre 4 et 20 caractères"
                    },
                    maxLength: 
                    { 
                      value: 20,
                      message: "Le userName doit contenir entre 4 et 20 caractères"
                    } 
                  })} 
                  />
                  {errors && <p>{errors.userName.message}</p>}
                </div>
                <div >
                  <label htmlFor="email">mail: </label><br/>
                  <input type="email" {...register("email", 
                  { 
                    minLength: 
                    { 
                      value: 4,
                      message: "Le userName doit contenir entre 4 et 30 caractères"
                    },
                    maxLength: 
                    { 
                      value: 30,
                      message: "Le userName doit contenir entre 4 et 30 caractères"
                    } 
                  })} 
                  />
                  {errors && <p>{errors.email.message}</p>}
                </div>
                {
                }
                <div >
                  <button type="submit" className="button">
                    Modifier le profil
                  </button>
                  <button type="button" className="button" onClick={() => {
                    deleteUser(user);
                  }}>
                    Supprimer le compte
                  </button>
                </div>
                
              </form>
          </article>
        </section>
      </main>
    )
  }
  return (
    <main>
      <h1>Hello et Bienvenue sur ton profil Groupomania</h1>
      <section>
        <article>
          <h2>Informations du compte</h2>
          <p>Pseudo: {user.userName}</p>
          <p>Mail: {user.email}</p>
        </article>
      </section>
    </main>
  )
}

export default Profile