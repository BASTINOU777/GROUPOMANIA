import "../../styles/Comments.css"
import { Outlet, Link } from 'react-router-dom'
import { React} from "react"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'

import DeleteComment from "./DeleteComments"


function TemplateComments ({value, permissions}){
    const comment =value;

    //fonction pour le nom de la personne qui publie , la date et l'heure 
function timeToCreation()
{
    let dateUpdate = new Date (`${comment.createdAt}`);
    let timeSincePost = (Date.now() - Date.parse(dateUpdate))/1000;//temps en secondes
    if (timeSincePost < 60) 
    {
      return `${Math.floor(timeSincePost)} seconde(s)`
    }
    else if ( (timeSincePost/60) < 60) 
    {
      return `${Math.floor(timeSincePost/60)} minute(s)`
    }
    else if ((timeSincePost/(60*60)) < 24) 
    {
      return `${Math.floor(timeSincePost/(60*60))} heure(s)`
    }
    else if ((timeSincePost/(60*60*24)) < 365) 
    {
      return `${Math.floor(timeSincePost/(60*60*24))} jour(s)`
    }
    else if ((timeSincePost/(60*60*24)) > 365) 
    {
      return `${Math.floor(timeSincePost/(60*60*24*365))} an(s)`
    }
    else
    {
      return `erreur`
    }
  }
//HTML à l'évent l'user peut like ou dislike
  return(
    <div className='commentTemplate' >
        <div className='comBody'>
          <div className="postHead">
            <p>
              Publié par <Link to={`/profile/${comment.profile.userName}`} > <strong>{` ${comment.profile.userName} `}</strong> </Link>
              il y a {timeToCreation()}
            </p>
            {
              (comment.userId === permissions.userId || permissions.admin === 1) && <DeleteComment value={comment} />
            }
          </div>

          <div className="post">{comment.text}</div>
        </div>
      <Outlet />
    </div>
  )
}

export default TemplateComments
