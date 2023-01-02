import React, { useEffect, useState } from 'react';
import Post from './components/Post';

function App() {

  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className='w-100 h-100 flex flex-col gap-10 bg-tailwind-blue px-[10%] pt-10'>
      {posts.map((post) => {
        return (
          <Post key={post.id} userId={post.userId} title={post.title} body={post.body} />
        )
      })};
    </div>
  )
}
export default App;
