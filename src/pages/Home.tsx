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

  interface CommentInterface {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

  interface commentLikes {
    postId: number;
    id: number;
    likes: number;
    interacted: number;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<CommentInterface[]>([]);

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
  }, [posts]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  })

  useEffect(() => {
    if (comments.length !== 0 && (localStorage.getItem("commentLikes")?.length === 0 || localStorage.getItem("commentLikes") === null)) {
      let commentLikes: commentLikes[] = [];
      comments.forEach((comment) => {
        var amountOfLikes = generateLikes();
        let commentLike: commentLikes = { postId: comment.postId, id: comment.id, likes: amountOfLikes, interacted: 0 };
        commentLikes.push(commentLike);
      })
      localStorage.setItem("commentLikes", JSON.stringify(commentLikes));
    }
  }, [comments]);

  return (
    <div className='flex flex-col gap-20 bg-reddit-black px-[10%] pt-10'>
      {posts.map((post) => {
        return (
          <Post key={post.id} postId={post.id} userId={post.userId} title={post.title} body={post.body} />
        )
      })};
    </div>
  )
}
export default Home;
