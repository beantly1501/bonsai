import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

function Home() {

  function generateLikes() {      //generates a random amount of likes, between -100 and 100, just because if not, all of them would be 0
    return Math.floor(Math.random() * (101 + 100) - 100)
  }



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

        var amountOfLikes = generateLikes();

        return (
          <Post key={post.id} postId={post.id} userId={post.userId} title={post.title} body={post.body} likes={amountOfLikes} />
        )
      })};
    </div>
  )
}
export default Home;
