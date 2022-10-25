import { useState, useEffect } from 'react';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
  
// //state
const Like = ({ posts, userId }) => {
  const id = userId;
    const [postLike, setPostLike] = useState()
    const [userLiked, setUserLiked] = useState()
//vérifie si l'user à like le post
  const checkLikes = (postLikes, userId) => {
    let isLiked = false;
    // je boucle les likes
    postLikes.forEach((likes) => {
        //si l'user qui like est égale à l'userId alors je le met dans le [] isLiked
        if (likes.author === userId) {
            isLiked = true;
        }        
    });
    return isLiked;
  };
//récupère le total des likes sur le post
useEffect(() =>{
  const getLikes = async () => {
    try {
      const res = await fetch (`http://localhost:3001/api/posts/${userId}/likes`,)
      const data = await res.json();
      if (!res.ok) return 
      const isLiked = checkLikes(data.likes, userId);
      console.log( "===>", isLiked );
      console.log("======>>>>>>>", userId);
      setUserLiked(isLiked);
      setPostLike(data.likes.length);
      return data
    } catch (error){
      return console.log(error);
    }
  };
   getLikes(); 
  }, [userLiked]);
    

//comportement

  const handleLike = async () => {
    const likeValue = userLiked ? false : true;
    const apiLike = {
      method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      userLiked: likeValue
  }),
}

try {
  const res = await fetch (`http://localhost:3001/api/posts/likes/${userId}`, apiLike);
  const data = await res.json();
  if (!res.ok)return;
  setUserLiked(!userLiked)
  likeValue ? setPostLike(postLike +1) : setPostLike(postLike -1);

  window.location.reload();
  return data
} catch (error) {
  return console.log("====>, error de setPostlike")
}
}
//render
return (
  <div className='like-icon-container'>
            {userLiked ?
                <FontAwesomeIcon icon={faThumbsUp} className='post-icons active-icon' onClick={() => handleLike()} />
                :
                <FontAwesomeIcon icon={faThumbsUp} className='post-icons' onClick={() => handleLike()} />
            }
            {postLike > 0 && <p>{postLike}</p>}
        </div>
  )
};
export default Like;