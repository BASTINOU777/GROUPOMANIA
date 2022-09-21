import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../api/PostsAPI'
import CustomPost from '../components/post/CustomPost'


function Feed({permissions})
  {
    const [posts, setList] = useState([]);
  useEffect(() => {
    getAllPosts()
    .then((response) => {
      setList(response);
    })
  }, [])

  return (
    <main id="feed">
      <h1>Les dernières publications</h1>
      <section>
          {
            posts.map((item) => 
            (
              <CustomPost value={item} permissions={permissions} key={`${item.postId}`} />
            ))
          }
      </section>
    </main>
  )
}

export default Feed