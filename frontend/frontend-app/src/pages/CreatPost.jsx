import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { createPost } from "../api/PostsAPI"
import "../styles/Posts.css"

function CreatePost() {
  // const { handleSubmit } = useForm();
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [pictures, setPictures] = useState({preview:"", data:""});
  const author = localStorage.getItem("username")
  const navigate = useNavigate();
  
  //au clic sur le bouton "poster", fonction de création de post et reload de la page
  const oneSubmit = (e) => { 
    // console.log("====>>>>>>>>>> data, event",data, e);
    e.preventDefault();

    // preventDefault();
    const formData = new FormData(e.target);
    formData.append(
      "attachement",
      e.target.attachement.files[0],
      e.target.attachement.files[0].attachement
    );
    formData.append("author", "test");
    formData.append("content", content);
    formData.append("title", title);
    formData.append("userId",userId);
    const formValues = JSON.stringify(Object.fromEntries(formData));
    console.log(formValues);
    console.log(formData); 

    axios.post("http://localhost:3001/api/posts/", formData, {
    headers:{
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})
    .then(function(res){
    console.log(res);
    alert("Le Post a bien été crée");
    navigate('/')
      })
    .catch(function(error){
    console.log(error)
    })    
  };
    // const handleFileChange = (e) => {
    //   const picture = {
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     data:e.target.attachement.files[0]}
    //   setPictures(picture);
    //  }
    return (
      <main>
        <h1>Publier sur Groupomania</h1>
        <section>
          <article>
          <h2>Créer une publication</h2>
          <form onSubmit={oneSubmit}>
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
          name="attachement"
          id="attachement"
          // onChange={handleFileChange}
          accept=".gif, .jpg, .png,"
          ></input>
				<button> Publier</button>
              </form>
          </article>
        </section>
      </main>
    );

};




export default CreatePost