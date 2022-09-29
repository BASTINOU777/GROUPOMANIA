import React from 'react'
// import { useForm } from "react-hook-form";
import { createPost } from "../api/PostsAPI"


function CreatePosts() 
{
 
  //au clic sur le bouton "modifier profil", fonction de mise à jour du profil et reload de la page
  function submitForm(event)
  { 
    event.preventDefault()
    let data = {
      title: event.target.titre.value,
      content: event.target.content.value,
      author: localStorage.getItem("userName")
    }
    createPost(data)
    .then((response) => 
    {
      console.log(response);
      alert("Le Post a bien été crée");
      window.location.replace("/");
    })
  }

    return (
      <main>
        <h1>Page de creation de Posts Groupomania</h1>
        <section>
          <article>
          <h2>Créer un post</h2>
            <form id="submitForm" onSubmit={submitForm}>
              <div>
                  <label htmlFor="Titre">Titre: </label><br/>
                  <input type="text" name="titre" placeholder='Titre'/>
                </div> 
                <div>
                  <label htmlFor="Content">Content</label><br/>
                  <input type="text" name="content" placeholder='Content'/>
                </div>
                <div >
                  <button type="submit" className="button">
                    Poster
                  </button>
                </div>
                
              </form>
          </article>
        </section>
      </main>
    )
}


export default CreatePosts