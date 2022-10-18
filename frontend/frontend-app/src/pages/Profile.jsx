import React, { useEffect , useState } from 'react'
// import { useForm } from "react-hook-form";
import { updateProfile, deleteProfile } from "../api/UserAPI"


function Profile() 
{
  const [user, setList] = useState([]);
  let profileUserName = localStorage.getItem('username') ;
  let profileEmail = localStorage.getItem('email');
  let profileUserId = localStorage.getItem('user_id');
  
  //rendering pour aller chercher les infos des users dans le DB
  useEffect(() => {
    let data = {
      username: profileUserName,
      user_id: profileUserId,
      email: profileEmail
    }
      setList(data);
    
  }, [])
  //au clic sur le bouton "modifier profil", fonction de mise à jour du profil et reload de la page
  function submitForm(event)
  { 
    event.preventDefault()
    let data = {
      newUsername: event.target.username.value,
      newEmail: event.target.email.value
    }
    updateProfile(user.userName, data)
    .then((response) => 
    {
      console.log(response);
      localStorage.setItem('username', data.newUsername);
      localStorage.setItem('email',data.newEmail);
      alert("Le profil a bien été modifié");
      window.location.replace(`/profile/${data.newUsername}`);
    })
  }

  // fonction de suppression du profil ( au clik du boutton suppression du profil) et reload sur la page de déconnexion 
  function deleteUser(data)
  {
    deleteProfile(data)
    .then((response) => 
    {
      window.location.reload();
      window.location.replace(`/login`);
    })
  }
  if (user.user_id){
    return (
      <main>
        <h1>Gérer mon compte</h1>
        <section>
          <article>
          <h1>Hello et Bienvenue sur ton profil Groupomania</h1>
          <section>
            <article>
              <h2>Informations du compte</h2>
               <p>Pseudo: {user.username}</p>
              <p>Mail: {user.email}</p>
            </article>
          </section>
          <h2>Modifiez votre compte</h2>
            <form id="submitForm" onSubmit={submitForm}>
              <div>
                  <label htmlFor="username">Pseudo: </label><br/>
                  <input type="text" name="username" placeholder='username'/>
                </div> 
                <div>
                  <label htmlFor="email">email: </label><br/>
                  <input type="text" name="email" placeholder='email'/>
                </div>
                <div >
                  <button type="submit" className="button">
                    Modifier le profil
                  </button>
                  <button type="button" className="button" onClick={() => {
                    deleteUser(profileUserName);
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
}

export default Profile