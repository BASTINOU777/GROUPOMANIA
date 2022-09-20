import DeletePost from "./DeletePost"
import "../../styles/Posts.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Outlet, Link } from 'react-router-dom'

function CustomPost({ value, permissions }){
  const post = value;

function timeToCreation()
{
  let dateUpdate = new Date (`${post.createdAt}`);
  //temps en secondes
  let timeSincePost = (Date.now() - Date.parse(dateUpdate))/1000;
  if (timeSincePost < 60) 
  {
      return `erreur`
    }
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
            Publié par <Link to={`/profile/${post.profile.userName}`} > <strong>{` ${post.profile.userName} `}</strong> </Link>
            il y a {(timeToCreation)}
          </p>
          {
            (post.profileId === permissions.profileId || permissions.admin === 1) && <DeletePost value={post}/>
          }
          
        </div>
        
        <Link to={`/post/${post.postId}`} >
          <h2>{post.title}</h2>
          <div className="post">{post.text}</div>
          <p className="postFeet"> {/*{post.commentNumber} Commentaire(s) */} </p>
        </Link>
      </div>
    <Outlet />
  </article>
)
}

export default CustomPost