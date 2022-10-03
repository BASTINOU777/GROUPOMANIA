import React from 'react'
// import { useForm } from "react-hook-form";
import { createPost } from "../api/PostsAPI"
import { useState } from 'react'
import styled from 'styled-components'
import LikeButton from "../components/post/LikeButton"

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
  const [setIsModifRN] = useState(false)
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
                <PostImg src={"data.attachment"}/>
                </PostImgContainer>
                <LikeButton author={"data.userName"} />
                <div >
                  <button type="submit" className="button">
                    Poster
                  </button>
                  <ButtonLign>
              <ImgButtonModif
                src={"data.attachment"}
                alt="modif image"
                onClick={(e) => {
                  e.preventDefault()
                  setIsModifRN(true)
                }}
              />
              {/* <SupprButton
                author={"data.attachment"}
                
              /> */}
            </ButtonLign>
                  
                </div>
                
              </form>
          </article>
        </section>
      </main>
    )
}


export default CreatePosts