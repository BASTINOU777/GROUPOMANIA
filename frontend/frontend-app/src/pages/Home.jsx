import CustomPost from "../components/Posts/CustomPost"
import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../api/PostsAPI'

//render
function Feed({ permissions })
  {
    const [posts, setList] = useState([]) 
//comportement
    useEffect(() => {
      getAllPosts()
      .then((response) => {
        console.log(response);
        setList(response);
        console.log('=>>> posts:', posts)
        console.log('=>>> response', response)
      })
    }, [])
//render
  return (
    <main id="feed">
      <h1>Les dernières publications</h1>
      {/* méthode map avec key pour distingué chaque éléments dans le [] */}
      <section>
          { 
            posts.map((item) => {
              return <CustomPost value={item} permissions={permissions} key={`${item.postId}`} />
            })
          }
      </section>
    </main>
  )
}

export default Feed