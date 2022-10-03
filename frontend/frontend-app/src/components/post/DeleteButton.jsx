import styled from 'styled-components'
import cross from "../assets/cross-png-25669.png"

const ImgButtonCross = styled.img`
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`

function SupprOnePost(post) {
  let userId = JSON.parse(localStorage.getItem("userId"))
  fetch(`http://localhost:3000/api/post/${post.id}/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userId.token}`,
    },
  })
    .then(function (res) {
      if (res.ok) {
        return res.json()
      }
    })
    .catch(function (err) {
      console.log(err)
    })
}

function handleSupprClick(post) {
  let res = window.confirm(
    `Êtes-vous sûr de vouloir supprimer ce post : ${title} ?`
  )
  if (res) {
    SupprOnePost(post)
  }
}

function SupprButton(post) {
  return (
    <ImgButtonCross
      src={cross}
      alt="croix rouge"
      onClick={(e) => {
        e.preventDefault()
        handleSupprClick(post)
      }}
    />
  )
}

export default SupprButton