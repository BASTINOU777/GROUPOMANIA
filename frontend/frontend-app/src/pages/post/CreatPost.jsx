import React from 'react'
import { useForm } from "react-hook-form"
import { createPost } from "../../api/PostsAPI";

function CreatePost({permissions}) 
{
  const {
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm();

  return (
    <main id="feed">
      <h1>Créer une publication sur Groupomania</h1>
      <section>
        <article>
          <form id="submitForm" onSubmit={handleSubmit((data) => {
            data.profileId = permissions.profileId;
            createPost(data)
            .then((response) => {
              alert(response.message);
            })
          })}>
            <div >
            <label htmlFor="title">titre: </label><br/>
              <input type="title" {...register("title", 
              { required: "Ce champ est requis" })} 
              placeholder='titre' />
              {errors && <p>{errors.titre.message}</p>}
            </div>
            <div >
              <label htmlFor="text">texte: </label><br/>
              <textarea type="text" {...register("text")} 
              placeholder='texte' />
            </div>
            <div >
              <button type="submit" className="button">
                Publier
              </button>
            </div>
          </form>
        </article>
      </section>
    </main>
  )
}

export default CreatePost