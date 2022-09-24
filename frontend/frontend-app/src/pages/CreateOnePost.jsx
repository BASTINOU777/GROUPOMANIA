import CustomPost from '../components/post/CustomPost'
import Comments from '../components/Comments/Comments'
import React, { useEffect, useState } from 'react'
import { getOnePost } from '../api/PostsAPI'
import postComments from '../components/Comments/postComments'

function CreateOnePost({permissions}) 
{
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  //let pageId = window.location.href.split("post/").pop();
  useEffect(() => {
    getOnePost(window.location.href.split("post/").pop())
    .then((response) => {
      setPost(response);
      setLoading(false);
    })
  }, [])

  return (
    <main id="feed"> 
      {//SI la page est en cours de chargement :
      }
      { loading?(<>
        <h1>CHARGEMENT EN COURS</h1>
        <section>
          <p>CHARGEMENT EN COURS</p>
        </section>
      </>):(<>
      {//Lorsque la page est chargée
      }
        <h1>{post.title}</h1>
        <section>
          <CustomPost value={post} permissions={permissions} key={`${post.id}`}/>
          <h2>Commentaires</h2>
          <postComments value={post} permissions={permissions}/>
          <Comments value={post} permissions={permissions} />
        </section>
      </>) }
    </main>
  )
}

export default CreateOnePost