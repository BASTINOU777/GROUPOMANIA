export async function login(users) {
  console.log("====>>", users);
  const email = users.email;
  const password = users.password;
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

export async function signUp(users) {
  const username = users.username;
  const email = users.email;
  const password = users.password1;

  const body = {
    username,
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:3001/api/signup/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    alert("erreur depuis AuthAPI.js" + error);
  }
}
export default async function GetPermissions(token) {
  return fetch("http://localhost:3001/api/signup/permissions", {
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
