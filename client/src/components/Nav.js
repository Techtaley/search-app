import React from 'react'
import { NavLink, Link } from 'react-router-dom' 

export default function MainNav() {
  return (
    <header className="vertical-center">
        <Link className="nav-links" to="/search-app"><h1>CRUD App</h1></Link>
        <nav className="nav-flex">
          <NavLink className="nav-links" to="/posts">posts</NavLink>
          <NavLink className="nav-links" to="/about">about</NavLink>
          <NavLink className="nav-links" to="/contact">contact</NavLink>
        </nav>
  </header>
)
}

