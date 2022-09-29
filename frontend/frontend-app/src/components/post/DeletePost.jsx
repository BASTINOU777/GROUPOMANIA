import {deletePost} from '../../api/PostsAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import * as React from "react";


function DeletePost({value}){
    function deleteComment(item)
    {
deletePost(item.id)
.then(()=>{
    window.location.reload();
    window.location.replace(`/`);
})
}
return (
    <span className="fontAwesomeSize" onClick={() =>
        deleteComment(value)
      }>
        <FontAwesomeIcon icon={faTrash} />
      </span>
    )
}

export default DeletePost


