import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

//CREATE - create(payload){.. .post(`/route`, payload)
export const addPostsAsync = createAsyncThunk(  //use this instead of fetchData
   'posts/addPostsAsync', 
   async(payload) => {  //need the id from the initialPost
    //const { userId, id, title, body} = action.payload
    try{
      //const response = await axios.post(`/posts`, { userId, id, title, body});  //handled on route in server.js
      const response = await axios.post(`/posts`, payload);  //handled on route in server.js
      console.log({'New Post': response?.data})
      return await response?.data  //return entire payload      
    // try{
    //   const response = await axios.put(`/posts`, {  //`/posts`, confit
    //     method: 'put',
    //     body: JSON.stringify(payload) //we could send (payload) everything to the api
    //     // body: JSON.stringify({ 
    //     //   items: payload.items,  //or send the items array to the api
    //     // })
    //   })
    } catch(error){
      return error.message
    }
   }
)

//UPDATE - update(id, payload){...  .put(`/route/${id}`, payload)
//Step 4: updates api by replacing all posts with updated store(based on updatePost())
//**ACM uses thunk to delay the running of side effects
export const updatePostsAsync = createAsyncThunk(  //use this instead of fetchData
   'posts/updatePostsAsync', 
   async(payload) => {  //need the id from the initialPost
    const { id } = payload
    try{
      const response = await axios.put(`/update/${id}`, payload);  //handled on route in server.js
      console.log({'updated': response?.data})
      return await response?.data  //return entire payload      
    // try{
    //   const response = await axios.put(`/posts`, {  //or axios.put(`/posts`, config);
    //     method: 'put',
    //     body: JSON.stringify(payload)
    //     // body: JSON.stringify({   //we could just change certain items in the api
    //     //   items: payload.items,
    //     //   status: payload.totalquantity
    //     // })
    //   })
    } catch(error){
      //return error.message
      return payload  //if post not found we return the entire updated payload
    }
   }
)
 
//GET BY ID - .get(id){...  .get(`/route/${id}`)  

//GET BY Title - .getByTitle(title){...   .get(`/post?title=${keyword}`

//GET ALL - .get(`/post`)  
//initially we need to get all posts onload - afterwards they are saved in localhost until app restarts
export const getPostsAsync = createAsyncThunk(  //use this instead of fetchData
   'posts/getPostsAsync', //actiontype 
    async() => {   //payload creator callback that returns a promise that returns response data or error - this promise returns lifecycle actions (pending, fulfilled, rejected) 
    //async(query) => {   
      try {
        const response = await axios.get(`/posts`);  //`https://jsonplaceholder.typicode.com/posts`
        console.log({'get': response?.data})
        return await response?.data  //return entire payload  
      } catch(error){
        return error.message
      }
   }
)

//DELETE by id - detete(id){...  .delete(`/route/${id}`)    //DELETE ALL - .delete(`/route`) 
export const deletePostsAsync = createAsyncThunk(  //use this instead of fetchData
   'posts/deletePostsAsync', 
   async(payload) => {
    const { id } = payload  
    try{
      const response = await axios.delete(`/delete/${id}`);  //handled on route in server.js
      console.log({'delete': response?.data})
      return await response?.data  //delete the entire payload      
    } catch(error){
      return error.message
    }
   }   
)