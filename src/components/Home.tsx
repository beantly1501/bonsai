import React, { useEffect, useState } from 'react';
import Post from './Post';

function Home() {

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
    <div className='flex flex-col gap-20 bg-reddit-black px-[10%] pt-10'>
      {posts.map((post) => {
        return (
          <Post key={post.id} postId={post.id} userId={post.userId} title={post.title} body={post.body} likes={0} />
        )
      })};
    </div>
  )
}
export default Home;
