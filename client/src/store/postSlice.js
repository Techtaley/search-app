import { createSlice } from '@reduxjs/toolkit'
import { addPostsAsync, getPostsAsync, updatePostsAsync, deletePostsAsync } from './post.actions.js'

const initialState = {
    items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [],
    status: 'idle',  //'idle' | 'loading' | 'success' | 'failed'
    loading: false,
    error: null,
    changed: false,
    user: 'coder'
}

const postSlice = createSlice({
    name: 'posts', //name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => { //this only adds an entry on the form
          // const { userId, id, title, body } = action.payload;  

          // const newPost = {
          //   userId,
          //   id,
          //   title,
          //   body,
          //   reactions: {
          //     likes: 0,
          //     hearts: 0
          //   }
          // }  

          //it's simplier to just add the action.payload          
          const existingPost = state.items.find(item => item.id === action.payload.id)
          if(!existingPost){  //if it is an existing post, does not add it and previous posts
              //state.items.unshift(newPost) //add to the beginning  
              state.items.unshift(action.payload)  //add to the beginning   
          }

          state.changed = true

          localStorage.setItem("items", JSON.stringify(state.items))  //replaces the state
        }, 
        updatePost: (state, action) => { //this only updates an entry on the form
          const previousPosts = state.items.filter(item => item.id !== action.payload.id)
          state.items = [action.payload, ...previousPosts] || [] //send over all previous posts, and updated post
          //| [] ensures structure remains if update results in removing the items array         

          localStorage.setItem("items", JSON.stringify(state.items))  
        }, 
        deletePost: (state, action) => { //applies to post selected for deletion
          const existingPost = state.items.find(item => item.id === action.payload.id)
          if(existingPost){  //if selectedpost exists delete it filter for all other posts
              state.items = state.items.filter(item => item.id !== existingPost.id) || []  
              //| [] ensures structure remains if all is deleted         
          }
          // const previousPosts = state.items.filter(item => item.id !== action.payload.id)
          // state.items = [...previousPosts] //send over all previous posts, not the deleted post

          state.changed = true

          localStorage.setItem("items", JSON.stringify(state.items))  
        }         
    },
    extraReducers: (builder) => {//related to state of thunk
      builder.addCase(addPostsAsync.pending, (state) => {
        state.status = 'added'
        state.loading = true      
      })
      builder.addCase(addPostsAsync.fulfilled, (state, action) => { 
        state.error = ''
        state.status = 'Successfully added a post!' 

        localStorage.setItem("items", JSON.stringify(state.items))       
      })
      builder.addCase(addPostsAsync.rejected, (state, action) => {
        state.loading = false
        state.items = []
        state.error = action.error.message
        state.status = 'Failed to add.'      
      })      
      builder.addCase(getPostsAsync.pending, (state) => {  //1. first action dispatched from thunk is 'pending' - here we handle action
        state.status = 'loading' //optional state.isLoading = true 
        state.loading = true
        //localStorage.setItem("items", JSON.stringify(state.items))                 
      })
      builder.addCase(getPostsAsync.fulfilled, (state, action) => {  //2. second action dispatched from thunk is 'fulfilled' - here we handle action
        state.items = action.payload  //get all previous items
        state.status = 'success'  //optional state.isLoading = false

        localStorage.setItem("items", JSON.stringify(state.items))  
      })
      builder.addCase(getPostsAsync.rejected, (state, action) => {  //3. third optional action dispatched from thunk is 'rejected'  - here we handle action
        state.status = 'failed.'   //optional state.isLoading = false     
        state.error = action.error.message
      })
      builder.addCase(updatePostsAsync.pending, (state) => {
        state.status = 'updating' 
        state.loading = true     
      })
      builder.addCase(updatePostsAsync.fulfilled, (state, action) => { 
        state.error = ''
        state.status = 'Successfully updated post!' 

        localStorage.setItem("items", JSON.stringify(state.items))       
      })
      builder.addCase(updatePostsAsync.rejected, (state, action) => {
        state.items = []
        state.error = action.error.message
        state.status = 'Failed to update.'      
      })
      builder.addCase(deletePostsAsync.pending, (state) => {
        state.status = 'deleting'  
        state.loading = true    
      })
      builder.addCase(deletePostsAsync.fulfilled, (state, action) => { 
        state.error = ''
        state.status = 'Successfully deleted post!' 

        localStorage.setItem("items", JSON.stringify(state.items))       
      })
      builder.addCase(deletePostsAsync.rejected, (state, action) => {
        state.items = []
        state.error = action.error.message
        state.status = 'Failed to delete.'      
      })                      
    },  
})

export const { addPost, getPost, updatePost, deletePost, changed } = postSlice.actions;

export default postSlice.reducer