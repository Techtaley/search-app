import React from 'react'
import { NavLink, Link } from 'react-router-dom' 

export default function MainNav() {
  return (
    <header className="vertical-center">
        <h1><Link to="/search-app">CRUD App</Link></h1>
        <nav className="nav-flex">
          <NavLink className="nav-links" to="/posts">posts</NavLink>
          <NavLink className="nav-links" to="/about">about</NavLink>
          <NavLink className="nav-links" to="/contact">contact</NavLink>
        </nav>
  </header>
)
}

