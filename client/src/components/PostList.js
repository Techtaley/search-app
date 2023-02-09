import React from 'react'
import PostExcerpt from './PostExcerpt'
import { useSelector } from 'react-redux'
    
    export default function PostList(){
        const postItems = useSelector(state => state.posts.items)
  
        return (
            <div>
                <h1 className="form-header">List of Posts</h1>

                <article className="component-div"> 
                    {postItems?.map(post => 
                        <PostExcerpt post={post}/>
                    )}
                </article>                     
            </div>
        )
}

