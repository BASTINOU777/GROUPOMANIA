import {deletePost} from '../../api/PostsAPI'
import "../../styles/Posts.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router-dom'
import * as React from "react";
import LikeButton from "./LikesPosts"
import styled from "styled-components";

const PostImgContainer = styled.div`
  display: flex;
  max-width: 90%;
  height: 300px;
  margin-top: 15px;
  overflow: hidden;
  border-radius: 35px;
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


function CustomPost({ value, permissions }){
  const post = value;
  let user = {
    userName: localStorage.getItem("userName"),
    isAdmin: localStorage.getItem("isAdmin")
  }
  function DeletePost(item){
    deletePost(item.id)
    .then(()=>{
        window.location.reload();
        window.location.replace(`/`);
    })
  }
return(
  <article className='postTemplate' >
      <div className='postBody'>
        <div className="postHead">
          <p>
            Publié par : {post.author + " "} 
             le {post.createdAt.split("T")[0] + " à " + post.createdAt.split("T")[1].split(".")[0]}
          </p>
          </div>
          <PostImgContainer>
            <PostImg src={post.attachement} alt="image du post" />
          </PostImgContainer>
          <div className="post">{post.content}
          <h2>{post.title}</h2>
          {/*// Pour mettre des Commentaire(s) 
          <p className="postFeet"> 
          {post.commentNumber}  
          </p> */}
          </div>
          {// eslint-disable-next-line 
            (post.author === user.userName|| user.isAdmin  == 1) && <span className="fontAwesomeSize" onClick={() =>
              DeletePost(post)
            }>
              <LikeButton postId={post} />
              <FontAwesomeIcon icon={faTrash} />
            </span>
          }      
      </div>
    <Outlet />
  </article>
)
}

export default CustomPost