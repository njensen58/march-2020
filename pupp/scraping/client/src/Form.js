import React from 'react'

export default function Form(props){
  const { handleSubmit, input, handleChange } = props
  return (
   <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={input}
          onChange={handleChange}
          placeholder="Git username"
        />
        <button>Get Repos</button>
      </form>
  )
}