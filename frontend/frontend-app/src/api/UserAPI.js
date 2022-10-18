export async function updateProfile(users, data) {
  return fetch(`http://localhost:3001/api/auth/${users}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      data,
    }),
  })
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      alert("erreur userAPI , updateProfile : " + error);
    });
}

export async function getProfile(users) {
  return fetch(`http://localhost:3001/api/profile/${users}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch(function (error) {
      alert("erreur userAPI, getProfile function :" + error);
    });
}

export async function deleteProfile(users) {
  console.log(users);
  console.log(users.username);
  return fetch(`http://localhost:3001/api/profile/${users.username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then((data) => data.json());
}
