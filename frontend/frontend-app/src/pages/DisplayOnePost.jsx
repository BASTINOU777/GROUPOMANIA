import "../styles/Posts.css"
import React, { useEffect, useState } from 'react'
import { getOnePost } from "../api/PostsAPI"
import CustomPost from "../components/Posts/CustomPost";


function DisplayOnePost({permissions}) 
{
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getOnePost(window.location.href.split("posts/").pop())
    .then((response) => {
      setPosts(response);
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
        <h1>{posts.title}</h1>
        <section>
          <CustomPost value={posts} permissions={permissions} key={`${posts.id}`}/>
          <h2>Commentaires</h2>
        </section>
      </>) }
    </main>
  )
}

export default DisplayOnePost