import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { createPost } from "../api/PostsAPI"
import "../styles/Posts.css"

function CreatePost() {
  const { handleSubmit } = useForm();
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [pictures, setPictures] = useState({preview:"", data:""});
  const author = localStorage.getItem("username")
  

  //au clic sur le bouton "poster", fonction de création de post et reload de la page
  const oneSubmit = (data, e) => { 
    console.log("====>>>>>>>>>> data, event",data, e);
    e.preventDefault();

    // preventDefault();
    const formData = new FormData();
    formData.append(
      "attachement",
      e.target.attachement.files[0],
      e.target.attachement.files[0].name
    );
    formData.append("author", author);
    formData.append("content", content);
    formData.append("title", title);
    formData.append("userId",userId);

    console.log("====>", FormData)
    createPost(FormData)
    .then((response) => 
    {
      alert("Le Post a bien été crée");
      window.location.replace("/");
    })
  };

    const handleFileChange = (e) => {
      const picture = {
        preview: URL.createObjectURL(e.target.files[0]),
      //   data= {data e.target.attachement[0],
      // };
      setPictures(picture);
    };
    
   
   
   
    return (
      <main>
        <h1>Publier sur Groupomania</h1>
        <section>
          <article>
          <h2>Créer une publication</h2>
          <form onSubmit={handleSubmit(oneSubmit)}>
              <div>
                  <label htmlFor="Titre">Titre: </label><br/>
                  <input type="text" name="titre" placeholder='Titre' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div> 
                <div>
                  <label htmlFor="Content">Écrivez votre publication</label><br/>
                  <input type="text" name="content" placeholder='Content' content ={content} onChange={(e) => setContent(e.target.value)}/>
                </div>
                 <label>Ajouter une image :</label>
                 <input
          type="file"
          id="attachement"
          name="attachement"
          onChange={handleFileChange}
          accept=".gif, .jpeg, .jpg"
          ></input>
				<button> Publier</button>
              </form>
          </article>
        </section>
      </main>
    );

};




export default CreatePost