import React, { useEffect, useState } from 'react'
import {getAllComments} from "../../api/CommentsAPI"

import TemplateComments from "./TemplateComments.jsx"

function CommentsDisplay({permissions})
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
            <TemplateComments value={item} permissions={permissions} key={`${item.commentId}`} />
          ))
        }
      </article>
    )
  }
  
  export default CommentsDisplay