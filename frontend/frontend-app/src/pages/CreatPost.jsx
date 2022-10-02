import React from 'react'
// import { useForm } from "react-hook-form";
import { createPost } from "../api/PostsAPI"
import styled from 'styled-components'

const PostImgContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 170px;
`
const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const ButtonLign = styled.div`
  display: flex;
`
const ImgButtonModif = styled.img`
  height: 35px;
  padding-right: 10px;
  &:hover {
    cursor: pointer;
  }
`

function CreatePosts() 
{
 
  //au clic sur le bouton "modifier profil", fonction de mise à jour du profil et reload de la page
  function submitForm(event)
  { 
    event.preventDefault()
    let data = {
      title: event.target.titre.value,
      content: event.target.content.value,
      author: localStorage.getItem("userName"),
      // attachment: event.target.DataTypes.ARRAY(DataTypes.INTEGER)
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
                <PostImgContainer>
                <PostImg src="pictures"/>{' '}
                </PostImgContainer>
                <div >
                  <button type="submit" className="button">
                    Poster
                  </button>
                  <ButtonLign>
              <ImgButtonModif
                src={""}
                alt="Crayon noir qui écrit"
                onClick={(e) => {
                  e.preventDefault()
                  setIsModifRN(true)
                }}
              />
              <SupprButton
                postId={postId}
                setApiCalled={setApiCalled}
                title={title}
              />
            </ButtonLign>
                  
                </div>
                
              </form>
          </article>
        </section>
      </main>
    )
}


export default CreatePosts