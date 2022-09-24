export async function login(user) {
  console.log(user);
  const email = user.email;
  const password = user.password;
  return fetch("http://localhost:3001/api/signup/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer {token}`,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch(function (error) {
      alert("erreur API" + error);
    });
}

export async function signUp(user) {
  const userName = user.userName;
  const email = user.email;
  const password = user.password1;
  return fetch("http://localhost:3001/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      email,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch(function (error) {
      alert("erreur depuis accountAPI.js" + error);
    });
}

export default async function getPermissions(token) {
  return fetch("http://localhost:3000/api/account/permissions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch(function (error) {
      alert("erreur api" + error);
    });
}
