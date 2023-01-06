import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

interface PostProps {
  postId: number;
  userId: number;
  title: string;
  body: string;
  likes: number;
  clickable?: boolean;
  interacted?: number;
}

function Post(props: PostProps) {

  const [likes, setLikes] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [interacted, setInteracted] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    setLikes(props.likes);
    if (props.interacted) {
      setInteracted(props.interacted);
    }
  }, [])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${props.userId}`)
      .then(res => res.json())
      .then(data => setUsername(data.username));
  })



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
    if (props.clickable !== false) {
      navigate(`/posts/${props.postId}`, {     //using state to transfer amount of likes to the PostPage component
        state: {
          postLikes: likes,
          interacted: interacted
        }
      })
    }
  }

  function handleUser() {
    navigate(`/users/${props.userId}`);
  }

  return (
    <div className='border-white border-2 p-5 transform hover:custom-shadow relative flex flex-col gap-5 bg-reddit-grey'>
      <>
        <img src="/images/profileIcon.jpg" alt="profileIcon" className='w-[2rem] absolute right-5 bottom-5 cursor-pointer' onClick={handleUser} />
        <p className='absolute right-16 bottom-6 text-white hidden sm:inline cursor-pointer' onClick={handleUser}>{username}</p>
      </>
      <div className='cursor-pointer' onClick={handleNavigate}>
        <p className='text-white pb-5 font-bold'>{props.title}</p>
        <p className='text-white'>{props.body}</p>
      </div>
      <div>
        <div className='text-white gap-2 items-center cursor-pointer inline-flex'>
          {interacted === 1 ? <p className='inline text-2xl hover:bg-gray-700 p-1 text-red-600'>↑</p> : <p className='inline text-2xl hover:bg-gray-700 p-1 text-white' onClick={() => handleLikes(1)}>↑</p>}
          <p className='inline text-white'>{likes}</p>
          {interacted === -1 ? <p className='inline text-2xl hover:bg-gray-700 p-1 text-red-600'>↓</p> : <p className='inline text-2xl hover:bg-gray-700 p-1 text-white' onClick={() => handleLikes(-1)}>↓</p>}
        </div>
      </div>
    </div>
  )
}
export default Post;
