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
    interacted: number;
  }

  interface postLikes {
    postId: number;
    likes: number;
    interacted: number;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);



  useEffect(() => {
    if (posts.length !== 0 && (localStorage.getItem("postLikes")?.length === 0 || localStorage.getItem("postLikes") === null)) {
      let postLikes: postLikes[] = [];
      posts.forEach((post) => {
        var amountOfLikes = generateLikes();
        let postLike: postLikes = { postId: post.id, likes: amountOfLikes, interacted: 0 };
        postLikes.push(postLike);
      })
      localStorage.setItem("postLikes", JSON.stringify(postLikes));
    }
  }, [posts])

  return (
    <div className='flex flex-col gap-20 bg-reddit-black px-[10%] pt-10'>
      {posts.map((post) => {
        var aux = localStorage.getItem("postLikes");
        let amountOfLikes = 0;
        let interacted = 0;

        if (aux) {
          let postLikes = JSON.parse(aux);
          postLikes.forEach((like: postLikes) => {
            if (post.id == like.postId) {
              amountOfLikes = like.likes;
              interacted = like.interacted;
            }
          })
        }
        return (
          <Post key={post.id} postId={post.id} userId={post.userId} title={post.title} body={post.body} likes={amountOfLikes} interacted={interacted} />
        )
      })};
    </div>
  )
}
export default Home;
