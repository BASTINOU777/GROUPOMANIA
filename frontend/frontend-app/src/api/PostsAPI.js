const HEADERS_CONTENT = new Headers({
  "Content-Type": "application/json",
  "User-ID": localStorage.getItem("userId"),
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getAllPosts() {
  console.log(HEADERS_CONTENT);

  const response = await fetch("http://localhost:3001/api/post/", {
    method: "GET",
    headers: HEADERS_CONTENT,
  });

  console.log("DEBUG response : ", response);

  const jsonResponse = await response.json();

  console.log("DEBUG json response : ", jsonResponse);
  return jsonResponse;
}

export async function getOnePost(pageId) {
  console.log(HEADERS_CONTENT);
  const response = await fetch("http://localhost:3001/api/post/" + pageId, {
    method: "GET",
    headers: HEADERS_CONTENT,
  });
  console.log("DEBUG response one post : ", response);

  const jsonResponse = await response.json();

  console.log("DEBUG json response one post: ", jsonResponse);
  return jsonResponse;
}
export async function createPost(data) {
  return fetch("http://localhost:3001/api/post/", {
    method: "POST",
    headers: HEADERS_CONTENT,
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export async function deletePost(id) {
  return fetch("http://localhost:3001/api/post/" + id, {
    method: "DELETE",
    headers: HEADERS_CONTENT,
  }).then((data) => data.json());
}
