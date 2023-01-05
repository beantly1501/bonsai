import React from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostPage />} />
      <Route path="/users/:id" element={<UserPage />} />
    </Routes>
  )
}
export default App;
