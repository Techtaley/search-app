import postReducer from './postSlice';
import { configureStore } from '@reduxjs/toolkit';

//includes api in the store to access api servicel
const store = configureStore({
    reducer: {
        posts: postReducer  //you don't need any other middleware for asyncthunk since this is included with 
    }
})

export default store;