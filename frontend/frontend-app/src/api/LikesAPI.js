// pour tous les Likes
export async function getLikes(post) {
  return fetch(`http://localhost:3000/api/post/${post.id}/${userId}/1`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((data) => data.json());
}
// pour creer un like
export async function createLike(item) {
  return fetch(`http://localhost:3000/api/post/${post.id}/0`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ item }),
  }).then((data) => data.json());
}

// pour sup un like
export async function deleteLike(item) {
  return fetch(`http://localhost:3000/api/post/${post.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ item }),
  }).then((data) => data.json());
}
