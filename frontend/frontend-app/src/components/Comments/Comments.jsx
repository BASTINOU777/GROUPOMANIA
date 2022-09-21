import CommentsCss from "./frontend/frontend-app/src/styles/Comments.css"
import React, { useEffect, useState } from 'react'


function CommentsDisplay()
{
    const [posts, setList] = useState([]);
  
    useEffect(() => {
      getAllComments(window.location.href.split("post/").pop())
      .then((response) => {
        setList(response);
      })
    }, [])
  
    return (
      <article>
        {
          posts.map((item) => 
          (
            <CommentsCss value={item} permissions={permissions} key={`${item.commentId}`} />
          ))
        }
      </article>
    )
  }
  
  export default CommentsDisplay