import { useState  } from "react";
import PostExcerpt from "./PostExcerpt";
import { useSelector } from 'react-redux'

//import { BallTriangle } from 'react-loader-spinner'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPostsAsync } from '../store/post.actions'  //fetches post
import { changed } from "../store/postSlice";

export default function Search() {
  const [query, setQuery] = useState('');  //gets value 
  const [searchResults, setSearchResults] = useState([]);  

  const dispatch = useDispatch()

    useEffect(() => {
 
      if(changed) {        
        dispatch(getPostsAsync())  
      }              
    }, [dispatch])
  

  const posts = useSelector(state => state.posts) 
  const postItems = useSelector(state => state.posts.items) 
  const searchFilterArray = postItems?.filter(post => post.title.toLowerCase().includes(query))  

  let handleChange = e => {  
    setSearchResults(searchFilterArray)  
    setQuery(e.target.value) 
  }

  let handleSubmit = async (e) => {  
    e.preventDefault();

    setSearchResults(searchFilterArray)  
    setQuery('')
  }

   
  return (
    <div className="search-component-card">
      <h1 className="form-header">Look up a post</h1>
        <form className="search-form" data-testid="search-form" onSubmit={handleSubmit}>
          <input 
            data-testid="search-form-input"
            type="text"
            name="query"
            value={query}
            className="search-form-input"
            placeholder="type a search term"
            onChange={handleChange}  
          />
          <button 
            data-testid="search-form-id"
            className='search-form-button' 
            type="submit"
          >
            Search
          </button> 

          <p>{posts?.status}</p>          
        </form>

          <div className="component-div">            
            {searchResults?.map(post => 
                <PostExcerpt
                  post={post}
                />            
            )}
          </div>
           
    </div>
  )
}
