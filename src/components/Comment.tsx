import { useState, useEffect } from "react";

interface CommentProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function Comment(props: CommentProps) {
  return (
    <div className="border-white border-2 p-2 cursor-pointer relative flex flex-col gap-5 bg-reddit-grey align-middle mx-36">
      <div className="flex flex-col gap-5">
        <p className="text-white">{props.name}</p>
        <p className="text-white">{props.body}</p>
      </div>
      <div>
        <div className='text-white flex gap-2 items-center'>

        </div>
      </div>
    </div>
  )
}

export default Comment;