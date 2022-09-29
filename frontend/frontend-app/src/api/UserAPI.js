export async function updateProfile(user, data) {
  return fetch(`http://localhost:3001/api/auth/${user}`, {
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

export async function getProfile(user) {
  return fetch(`http://localhost:3001/api/auth/${user}`, {
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

export async function deleteProfile(user) {
  console.log(user);
  console.log(user.userName);
  return fetch(`http://localhost:3001/api/profile/${user.userName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then((data) => data.json());
}
