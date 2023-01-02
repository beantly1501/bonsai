import React, { useEffect, useState } from 'react';

interface PostProps {
  userId: number;
  title: string;
  body: string;
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
  return (
    <div className='border-white border-2 p-5 transform hover:custom-shadow cursor-pointer relative flex flex-col gap-5'>
      <div>
        <p className='text-white pb-5 font-bold'>{props.title}</p>
        <p className='text-white pb-'>{props.body}</p>
      </div>
      <div>
        <div className='text-white flex gap-2 items-center'>
          <p className='inline text-2xl'>↑</p>
          <p className='inline text-white'>123</p>
          <p className='inline text-2xl'>↓</p>
        </div>
      </div>
    </div>
  )
}
export default Post;
