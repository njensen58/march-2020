import React from 'react'

export default function Repo(props){
  const { title, description, lang, stars, updatedOn } = props 
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{lang}</p>
    </div>
  )
}