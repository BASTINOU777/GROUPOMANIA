import { useState } from 'react'
import { useEffect } from 'react'
import * as React from "react";
import heartEmpty from '../assets/heartEmpty.png'
import heartFull from '../assets/heartFull.png'
import styled from 'styled-components'

const LikeLign = styled.div`
  display: flex;
  align-items: center;`

  const ButtonHeart = styled.img`
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`

const LikeCount = styled.p`
  font-size: 14px;
  padding-left: 10px;
  margin: 0;
`



function LikeButton(post) {
  let userId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
        fetch(`http://localhost:3000/api/post/${post.id}/${userId}/`, {
          method: 'PUT',
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
          .then(function (value) {
            setIsLiked(true)
          })
          .catch(function (err) {
            console.log(err)
          })
  },) 

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

