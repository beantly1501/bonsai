import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Comment from "./Comment";

function PostPage() {
  interface PostInterface {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  interface CommentInterface {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }

  const [postData, setPostData] = useState<PostInterface>();
  const [comments, setComments] = useState<CommentInterface[]>();

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPostData(data));
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  })

  var length: number = 0;

  if (comments !== undefined || comments !== null) {
    comments?.forEach(comment => {
      if (comment.postId === postData?.id) {
        length++;
      }
    });
  }

  return (
    <div className='flex flex-col gap-20 bg-reddit-black px-[10%] p-10'>
      {postData ? <Post key={postData.id} postId={postData.id} userId={postData.userId} title={postData.title} body={postData.body} likes={0} /> : null}
      <hr></hr>
      <p className="text-white text-rig text-xl ml-36">{length} Comments</p>
      {comments?.map((comment) => {
        if (comment.postId === postData?.id) {
          return (
            <Comment key={comment.id} id={comment.id} postId={comment.postId} name={comment.name} email={comment.email} body={comment.body} />
          )
        }
      })}
    </div>
  )
}

export default PostPage;
