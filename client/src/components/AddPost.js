import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPost } from './../store/postSlice'
import { addPostsAsync } from './../store/post.actions'

export default function AddPost() { 
  const [title, setTitle] = useState('') 
  const [body, setBody] = useState('') 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const randomid = Math.floor(Math.random() * 9999)
  
  const handleAdd = e => { 
    e.preventDefault() 
  
    const newPost = {
      userId: 1,
      id: randomid,
      title, 
      body     
    }
        
    console.log(newPost)

    dispatch(addPost(newPost)) 

    //step 4 - dispatch new post to API using Thunk 
    dispatch(addPostsAsync(newPost))

    navigate(`/posts/post-list`)  
  }

  return (
    <div className="component-card">
      <h1>Add a new Post</h1>
        <form className="add-form" onSubmit={ handleAdd }>
            <input
                type="text"
                name="title"
                className="add-form-input"
                value={title}
                onChange={e => setTitle(e.target.value)}    
            />
            
            <textarea
                type="text"
                name="body"
                className="add-form-textarea"
                value={body}
                onChange={e => setBody(e.target.value)}   
            />
            <button type="submit">add</button>
        </form>                  
    </div>
  )
}

