import React from 'react'
// import { useState } from 'react';
// import { useForm } from "react-hook-form";
import { createPost } from "../api/PostsAPI"
import "../styles/Posts.css"


function CreatePosts() 
{
  //au clic sur le bouton "poster", fonction de création de post et reload de la page
  function submitForm(event)
  { 
    event.preventDefault()
    let data = {
      title: event.target.titre.value,
      content: event.target.content.value,
      author: localStorage.getItem("userName"),
      attachment: event.target.attachment,
    }
    createPost(data)
    .then((response) => 
    {
      console.log(response);
      alert("Le Post a bien été crée");
      window.location.replace("/");
    })
  }
  const customTxt = document.getElementById('customText');
	const realFileBtn = document.getElementById('inputImage');

	const clickRealButton = async () => {
		const realFileBtn = document.getElementById('inputImage');
		realFileBtn.click();
	};
  
	const fileSelectedHandler = (event) => {
		createPost({
			selectedFile: event.target.files[0],
		});
		customTxt.innerHTML = realFileBtn.files[0].name;
		console.log(realFileBtn.files[0].name);
	};
    return (
      <main>
        <h1>Publier sur Groupomania</h1>
        <section>
          <article>
          <h2>Créer une publication</h2>
            <form id="submitForm" onSubmit={submitForm}>
              <div>
                  <label htmlFor="Titre">Titre: </label><br/>
                  <input type="text" name="titre" placeholder='Titre'/>
                </div> 
                <div>
                  <label htmlFor="Content">Écrivez votre publication</label><br/>
                  <input type="text" name="content" placeholder='Content'/>
                </div>
                 <label>Ajouter une image :</label>
				<div className="containerImageUpload">
					<input
						type="file"
						onChange={fileSelectedHandler}
						id="inputImage"
						placeholder="Choisir un fichier"
					/>
					<button id="customButton" onClick={clickRealButton}>
						<p>Ajouter une image</p>
						<span className="material-icons">add_photo_alternate</span>
					</button>
					<div className="customText">
						<span id="customText">Pas d'image ajoutée</span>
					</div>
				</div>
				<button onClick={submitForm}> Publier</button>
              </form>
          </article>
        </section>
      </main>
    )
}



export default CreatePosts