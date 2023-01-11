import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { updatePost } from './../store/postSlice'
import { updatePostsAsync } from './../store/post.actions'

export default function UpdatePost() {  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams(); 
  let searchid = Number(params.id) 
  
  const posts = useSelector(state => state.posts)  
  const existingPost = posts.items.find(post => post.id === searchid)    
  
  const [updatedTitle, setUpdatedTitle] = useState(existingPost?.title)
  const [updatedBody, setUpdatedBody] = useState(existingPost?.body)

  const handleUpdate = e => { 
    e.preventDefault() 

    dispatch(updatePost({  
      userId: existingPost.userId,
      id: existingPost.id,
      title: updatedTitle, 
      body: updatedBody        
    }))

    dispatch(updatePostsAsync({ existingPost }))

    navigate(`/posts/post-list`)  
  }

  return (

  <div className="component-card" key={params.id}>
      <form className="edit-form" onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          className="edit-form-input"
          value={updatedTitle}
          onChange={e => setUpdatedTitle(e.target.value)}            
        />
        
        <textarea
          type="text"
          name="body"
          className="edit-form-textarea"
          value={updatedBody}
          onChange={e => setUpdatedBody(e.target.value)}   
        />
        <button type="submit">update</button>
      </form>                  
    </div>
  )
}

