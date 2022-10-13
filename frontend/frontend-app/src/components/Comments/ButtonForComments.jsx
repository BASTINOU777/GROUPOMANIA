import React from 'react'
import { useForm } from "react-hook-form"


function WriteComment({value, permissions}) 
{
  const {
    register, 
    handleSubmit, 
  } = useForm();

  const author = JSON.parse(localStorage.getItem('user')).userName;
  console.log(author);
  return (
  <article>
    <h2>Commenter en tant que {author}</h2>
    <form id="submitForm" onSubmit={handleSubmit((data) => {
      data.profileId = permissions.profileId;
      data.postId = value.postId;
      createComment(data);
      alert("Le commentaire a bien été publié");
      window.location.reload();
      })}>
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
  )
}

export default WriteComment