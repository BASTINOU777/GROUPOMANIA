// pour tous les commentaires
export async function getAllComments(postId) {
  return fetch("http://localhost:3000/api/comment/" + postId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((data) => data.json());
}
// pour creer un com 
export async function createCommentFunction(item) {
    return fetch('http://localhost:3000/api/comment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ item })
      })
    .then(data => data.json())
}
// pour sup un com 
export async function deleteCommentFunction(pageId) {
  return fetch('http://localhost:3000/api/comment/'+pageId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(data => data.json())
}