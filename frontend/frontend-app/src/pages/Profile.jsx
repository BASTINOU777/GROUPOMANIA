import React, { useEffect, useState } from 'react'


function Profile (){
    const [user, setList] = useState([]);
    let profile = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        let userName = window.location.href.split("profile/").pop();
        getProfileFunction(userName)
        .then((response) => {
          setList(response);
        })
      }, [])
}
export default Profile