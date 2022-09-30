import { useState } from 'react'
import { useEffect } from 'react'
import * as React from "react";
import heartEmpty from '../assets/heartEmpty.png'
import heartFull from '../assets/heartFull.png'
import '../styles/Likes.css'



function LikeButton(post) {
  let userId = JSON.parse(localStorage.getItem("userId"));
  const [isLiked, setIsLiked] = useState(false)

  const [changeOnLike, setChangeOnLike] = useState(null)

  useEffect(() => {
    if (changeOnLike !== null) {
      if (changeOnLike === true) {
        fetch(`http://localhost:3000/api/post/${post.id}/${userId}/1`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          .then(function (value) {
            setIsLiked(true)
          })
          .catch(function (err) {
            console.log(err)
          })
      } else if (changeOnLike === false) {
        fetch(`http://localhost:3000/api/post/${post.id}/0`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
          body: JSON.stringify({ author }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          .then(function (value) {
            setIsLiked(false)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }, [changeOnLike]) 
  let token = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'))
    fetch(`http://localhost:3000/api/post/${post.id}/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((likesData) => {
          setLikeCount(likesData.length)
          if (likesData.length) {
            const like = likesData.find((e) => e.userId === login.userId)
            if (like) {
              setIsLiked(true)
            }
          }
        })
        .catch((error) => console.log(error))
    )
  }, [isLiked]) 

  const [likeCount, setLikeCount] = useState()

  const isPlural = likeCount > 1 ? true : false

  if (likeCount === 0) {
    return isLiked ? (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur plein"
          src={heartFull}
          onClick={() => {
            setChangeOnLike(false)
          }}
        />
      </LikeLign>
    ) : (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur vide"
          src={heartEmpty}
          onClick={() => {
            setChangeOnLike(true)
          }}
        />
      </LikeLign>
    )
  } else {
    return isLiked ? (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur pour liker"
          src={heartFull}
          onClick={() => {
            setChangeOnLike(false)
          }}
        />
        <LikeCount>
          {likeCount} {isPlural ? 'personnes ont liké' : 'personne a liké'}
        </LikeCount>
      </LikeLign>
    ) : (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur vide"
          src={heartEmpty}
          onClick={() => {
            setChangeOnLike(true)
          }}
        />
        <LikeCount>
          {likeCount} {isPlural ? 'personnes ont liké' : 'personne a liké'}
        </LikeCount>
      </LikeLign>
    )
  }
}

export default LikeButton