import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link, Outlet } from 'react-router-dom';
import { deletePostsAsync } from '../store/post.actions';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/postSlice';

import { useParams } from 'react-router-dom'

export default function SinglePostPage() {
  const params = useParams()
  const searchid = Number(params.id) 

  const posts = useSelector(state => state.posts)
  const existingPost = posts.items.find(post => post.id === searchid)

  const dispatch = useDispatch()
  const navigate = useNavigate()

 
  const handleDelete = (e) => {
    e.preventDefault()

    dispatch(deletePost(existingPost))  

    dispatch(deletePostsAsync(existingPost))  

    navigate(`/posts/post-list`)  
  }

  return (
      <article className="component-card" key={existingPost.id}>
        <h4 id="title" className="component-card-title">{existingPost.title}</h4>
        <p className="component-card-body">{existingPost.body}</p>    

        <div className="button-div">
            <Link to={`/update/${existingPost.id}`} className="pagelink">
              <button>Edit</button>
            </Link>
            
            <button onClick={handleDelete}>Delete</button>

            <Link to={`comments`} className="pagelink">
              <button>Comment</button>
            </Link> 

            <Outlet/>

        </div> 
      </article>       
  )
}