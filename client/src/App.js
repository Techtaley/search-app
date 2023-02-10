import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' 
import { lazy, Suspense } from 'react';

import Search from './components/Search';
import UpdatePost from './components/UpdatePost';
import DetailedPost from './components/DetailedPost';
import AddPost from './components/AddPost';
import Comments from './components/Comments';
import './App.css';
import Nav from './components/Nav';
import Contact from './components/Contact';
import About from './components/About';

import { BallTriangle } from 'react-loader-spinner'

const Posts = lazy(() => import('./components/Posts'));
const PostExcerpt = lazy(() => import('./components/PostExcerpt'));
const PostList = lazy(() => import('./components/PostList'));

export default function App() {
  return (
    <div className="App">      
        <Router>
          <Nav />

          <Suspense fallback={<div className="page-center">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#666"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            /> 
            </div>}>

              <h1>React Redux CRUD Application</h1>
            <Routes>
              <Route path="/" element={<Navigate replace to="/search-app" />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/posts" element={<Posts />}>  
                <Route path="search-app" element={<Search />} />
                <Route path="post-list" element={<PostList />} />            
                <Route path="add-post" element={<AddPost />} />            
                <Route path="detailed-post/:id" element={<DetailedPost />}>                
                  <Route path="comments" element={<Comments />} />
                </Route> 
                <Route path="post-excerpt/:id" element={<PostExcerpt />} />              
              </Route>  

              <Route path="/update/:id" element={<UpdatePost />} />
              <Route path="/add-post" element={<AddPost />} />
            </Routes>
          </Suspense>

        </Router>
    </div>
  );
}



