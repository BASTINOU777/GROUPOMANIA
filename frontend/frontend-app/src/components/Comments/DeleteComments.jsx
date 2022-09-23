
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {React} from 'react';

function DeleteComment({value}){

  function deleteComment(item)
  {
    deleteComment(item.commentId)
      .then(() => 
      {
        window.location.reload();
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

export default DeleteComment