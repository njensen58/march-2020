import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Nav(props){
  const { logout } = props
  return (
    <nav>
      <Link to="/issues">Home</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  )
}

Nav.propTypes = {
  logout: PropTypes.func.isRequired
}