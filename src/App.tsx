import React from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Home from './components/Home';
import PostPage from './components/PostPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostPage />} />
    </Routes>
  )
}
export default App;
