import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' 

export default function PostExcerpt({post}) {  
  
  const other = useSelector(state => state.posts)
  
  return (
    <article className="component-card" key={post.id}>
        <h4 className="component-card-title">{post.title}</h4>
        <p className="component-card-body">{post.body.length > 99 ? `${post.body.substring(0, 100)}...` : post.body}</p>
        <div>
            <Link to={`/posts/detailed-post/${post.id}`} className="pagelink">
              <button>View</button>
            </Link>
        </div>

        <p className="post-credit">author: {other?.user}</p>
    </article>
  )
}
