import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

interface PostProps {
  postId: number;
  userId: number;
  title: string;
  body: string;
  likes: number;
}

// function Post(props: PostProps) {
//   return (
//     <div className='pb-10'>
//       <p>userId: {props.userId}</p>
//       <p>title: {props.title}</p>
//       <p>body: {props.body}</p>
//     </div>
//   )
// }

function Post(props: PostProps) {

  const [likes, setLikes] = useState<number>(0);
  const [interacted, setInteracted] = useState<number>(0);
  const likeRef = useRef<HTMLParagraphElement>(null);
  const dislikeRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLikes(props.likes);
  }, [])

  function handleLikes(num: number) {
    if (num === 1 && interacted === 0) {
      setInteracted(1);
      setLikes((prevLikes) => prevLikes + num);
    }
    else if (num === -1 && interacted === 0) {
      setInteracted(-1);
      setLikes((prevLikes) => prevLikes + num);
    }
    else if (num === 1 && interacted === -1) {
      setInteracted(1);
      setLikes((prevLikes) => prevLikes + (num * 2));
    }
    else if (num === -1 && interacted === 1) {
      setInteracted(-1);
      setLikes((prevLikes) => prevLikes + (num * 2));
    }
  }

  function handleNavigate() {
    navigate(`/posts/${props.postId}`)
  }

  return (
    <div className='border-white border-2 p-5 transform hover:custom-shadow cursor-pointer relative flex flex-col gap-5 bg-reddit-grey' onClick={handleNavigate}>
      <div>
        <p className='text-white pb-5 font-bold'>{props.title}</p>
        <p className='text-white pb-'>{props.body}</p>
      </div>
      <div>
        <div className='text-white flex gap-2 items-center'>
          {interacted === 1 ? <p className='inline text-2xl hover:bg-gray-700 p-1 text-red-600' ref={likeRef}>↑</p> : <p className='inline text-2xl hover:bg-gray-700 p-1 text-white' onClick={() => handleLikes(1)} ref={likeRef}>↑</p>}
          <p className='inline text-white'>{likes}</p>
          {interacted === -1 ? <p className='inline text-2xl hover:bg-gray-700 p-1 text-red-600' ref={likeRef}>↓</p> : <p className='inline text-2xl hover:bg-gray-700 p-1 text-white' onClick={() => handleLikes(-1)} ref={likeRef}>↓</p>}
        </div>
      </div>
    </div>
  )
}
export default Post;
