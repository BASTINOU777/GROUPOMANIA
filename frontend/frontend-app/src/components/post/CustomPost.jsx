import {deletePost} from '../../api/PostsAPI'
import "../../styles/Posts.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Outlet } from 'react-router-dom'
import * as React from "react";



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
      <div className="likesBar">
        <span className="fontAwesomeSize" onClick={() =>
          console.log("on veut mettre un like")
        }>
        <FontAwesomeIcon icon={faCircleArrowUp} />
        </span>
        <p>{post.likes}</p>
        <span className="fontAwesomeSize" onClick={() =>
          console.log("on veut mettre un dislike")
        }>
          <FontAwesomeIcon icon={faCircleArrowDown} />
        </span>
      </div>
      <div className='postBody'>
        <div className="postHead">
          <p>
            Publié par : {post.author + " "} 
             le {post.createdAt.split("T")[0] + " à " + post.createdAt.split("T")[1].split(".")[0]}
          </p>
          {
            (post.author === user.userName|| user.isAdmin   == 1) && <span className="fontAwesomeSize" onClick={() =>
              DeletePost(post)
            }>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          }
          
        </div>
        
       
          <h2>{post.title}</h2>
          <div className="post">{post.content}</div>
          <p className="postFeet"> {/*{post.commentNumber} Commentaire(s) */} </p>
        
      </div>
    <Outlet />
  </article>
)
}

export default CustomPost