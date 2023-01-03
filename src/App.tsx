import React from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Home from './components/Home.js';
import PostPage from './components/PostPage.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<PostPage />} />
    </Routes>
  )
}
export default App;
