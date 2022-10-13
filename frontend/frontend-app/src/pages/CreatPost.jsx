import React from 'react'
import { useState, useRef } from 'react';
// import { useForm } from "react-hook-form";
import { createPost } from "../api/PostsAPI"
// import "../styles/Posts.css"
function CreatePosts() 
{
  const [selectedFile, setPostText] = useState(null);

  //au clic sur le bouton "poster", fonction de création de post et reload de la page
  // function submitForm(event)
  function submitForm(event) 
  { 
    console.log("ok")
    event.preventDefault()
    console.log(event.target);
    let filename = {
      title: event.target.titre.value,
      content: event.target.content.value,
      author: localStorage.getItem("userName"),
      attachement: selectedFile
    }
    console.log(filename)
    createPost(filename)
    .then((response) => 
    {
      console.log(response);
      alert("Le Post a bien été crée");
      window.location.replace("/");
    })
  } 
   
    return (
      <main>
        <h1>Publier sur Groupomania</h1>
        <section>
          <article>
          <h2>Créer une publication</h2>
          <form onSubmit={submitForm}>
              <div>
                  <label htmlFor="Titre">Titre: </label><br/>
                  <input type="text" name="titre" placeholder='Titre'/>
                </div> 
                <div>
                  <label htmlFor="Content">Écrivez votre publication</label><br/>
                  <input type="text" name="content" placeholder='Content'/>
                </div>
                 <label>Ajouter une image :</label>
                 <input
          type="file"
          value={selectedFile ? selectedFile :""}
          onChange= {(event) => {
						setPostText(event.target.value);
					}}
        />
        
				<button> Publier</button>
              </form>
          </article>
        </section>
      </main>
    )
}



export default CreatePosts