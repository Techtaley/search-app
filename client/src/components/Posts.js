import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Posts() {
  return (
    <div className="page-navigation">
        <h1>React Redux CRUD APPLICATION</h1>
        <p>Click to add, search, or view posts? </p>

        <nav>
            <NavLink className="page-nav-links" to="/posts/add-post">add</NavLink>
            <NavLink className="page-nav-links" to="/posts/search-app">search</NavLink>
            <NavLink className="page-nav-links" to="/posts/post-list">posts</NavLink>
        </nav>

        <div className="horizontal-center">          
          <Outlet />
        </div>
    </div>
  )
}

