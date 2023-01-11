import { useState, useEffect, useRef } from "react";

interface CommentProps {
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

function Comment(props: CommentProps) {

  function generateLikes() {      //generates a random amount of likes, between -100 and 100, just because if not, all of them would be 0
    return Math.floor(Math.random() * (101 + 100) - 100)
  }

  useEffect(() => {
    let aux = localStorage.getItem("commentLikes");
    if (aux) {
      let likes = JSON.parse(aux);
      likes.forEach((like: commentLikes) => {
        if (props.postId == like.postId && props.id == like.id) {
          setLikes(like.likes);
          setInteracted(like.interacted);
        }
      })
    }
  }, [])

  const [likes, setLikes] = useState<number>(0);
  const [interacted, setInteracted] = useState<number>(0);

  function handleLikes(num: number) {
    let aux = localStorage.getItem("commentLikes");
    if (aux) {
      let auxLikes: commentLikes[] = JSON.parse(aux);
      for (let i = 0; i < auxLikes.length; i++) {
        if (auxLikes[i].id == props.id && auxLikes[i].postId == props.postId) {
          if (num === 1 && interacted === 0) {
            setInteracted(1);
            auxLikes[i].interacted = 1;
            setLikes((prevLikes) => prevLikes + num);
            auxLikes[i].likes = likes + num;
          }
          else if (num === -1 && interacted === 0) {
            setInteracted(-1);
            auxLikes[i].interacted = -1;
            setLikes((prevLikes) => prevLikes + num);
            auxLikes[i].likes = likes + num;
          }
          else if (num === 1 && interacted === -1) {
            setInteracted(1);
            auxLikes[i].interacted = 1;
            setLikes((prevLikes) => prevLikes + (num * 2));
            auxLikes[i].likes = likes + (num * 2);
          }
          else if (num === -1 && interacted === 1) {
            setInteracted(-1);
            auxLikes[i].interacted = -1;
            setLikes((prevLikes) => prevLikes + (num * 2));
            auxLikes[i].likes = likes + (num * 2);
          }
          break;
        }
      }
      localStorage.setItem("commentLikes", JSON.stringify(auxLikes));
    }
  }

  return (
    <div className="border-white border-2 p-5 relative flex flex-col gap-5 bg-reddit-grey align-middle mx-5 sm:mx-36">
      <div className="flex flex-col gap-5">
        <p className="text-white font-bold">{props.name}</p>
        <p className="text-white">{props.body}</p>
      </div>
      <div>
        <div className='text-white inline-flex gap-2 items-center cursor-pointer'>
          {interacted === 1 ? <p className='inline text-2xl hover:bg-gray-700 p-1 text-red-600'>↑</p> : <p className='inline text-2xl hover:bg-gray-700 p-1 text-white' onClick={() => handleLikes(1)}>↑</p>}
          <p className='inline text-white'>{likes}</p>
          {interacted === -1 ? <p className='inline text-2xl hover:bg-gray-700 p-1 text-red-600'>↓</p> : <p className='inline text-2xl hover:bg-gray-700 p-1 text-white' onClick={() => handleLikes(-1)}>↓</p>}
        </div>
      </div>
    </div>
  )
}

export default Comment;