import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../api/PostsAPI'


function Feed({permissions}){
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
      <h1>Les dernières publications sur Groupomania</h1>
      <section>
          {
            posts.map((item) => 
            (
              <TemplatePost value={item} permissions={permissions} key={`${item.postId}`} />
            ))
          }
      </section>
    </main>
  )
}

export default Feed 