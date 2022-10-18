const HEADERS_CONTENT = new Headers({
  "Content-Type": "application/json",
  "User-ID": localStorage.getItem("user_id"),
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const getHeaders = () => {};

export async function getAllPosts() {
  const headers = getHeaders();
  console.log("mes headers", HEADERS_CONTENT);

  const response = await fetch("http://localhost:3001/api/posts/", {
    method: "GET",
    headers: HEADERS_CONTENT,
  });

  console.log("DEBUG response : ", response);

  const jsonResponse = await response.json();

  console.log("DEBUG json response : ", jsonResponse);
  return jsonResponse;
}

export async function getOnePost(_id) {
  console.log(HEADERS_CONTENT);
  const response = await fetch("http://localhost:3001/api/posts/" + _id, {
    method: "GET",
    headers: HEADERS_CONTENT,
  });
  console.log("DEBUG response one post : ", response);

  const jsonResponse = await response.json();

  console.log("DEBUG json response one post: ", jsonResponse);
  return jsonResponse;
}
export async function createPost(filename) {
  const response = await fetch(`http://localhost:3001/api/posts/`, {
    method: "POST",
    headers: HEADERS_CONTENT,
    body: JSON.stringify(filename),
  })
    .then((response) => response.json())
    .then((response2) => console.log(response2));
}

export async function deletePost(user_id) {
  return fetch("http://localhost:3001/api/posts/" + user_id, {
    method: "DELETE",
    headers: HEADERS_CONTENT,
  }).then((data) => data.json());
}
