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
  const posts = value;
  let users = {
    userName: localStorage.getItem("username"),
    isAdmin: localStorage.getItem("is_admin")
  }
  console.log("============<<<<<< post.attachement", posts.attachement);
  function DeletePost(item){
    deletePost(item.userId)
    .then(()=>{
        window.location.reload();
        window.location.replace(`/`);
    })
    console.log("========> dans le deletepost", item.userId)
    
  }
return(
  <article className='postTemplate' >
      <div className='postBody'>
        <div className="postHead">
          <p>
            Publié par : {posts.author + " "} 
             le {posts.createdAt.split("T")[0] + " à " + posts.createdAt.split("T")[1].split(".")[0]}
          </p>
          </div>
          <PostImgContainer>
            <img src={posts.attachement} alt="image du post" />
          </PostImgContainer>
          <div className="posts">{posts.content}
          <h2>{posts.title}</h2>
          </div>
          {
            (posts.author === users.userName|| users.isAdmin  == 1) && <span className="fontAwesomeSize" onClick={() =>
              DeletePost(posts)
            }>
              <LikeButton userId={posts} />
              <FontAwesomeIcon icon={faTrash} />
            </span>
          }      
      </div>
    <Outlet />
  </article>
)
}

export default CustomPost