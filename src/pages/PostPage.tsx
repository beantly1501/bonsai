import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Post from "../components/Post";
import Comment from "../components/Comment";

function PostPage() {

  const location = useLocation();   //used for retrieving amount of likes from the Post component
  interface PostInterface {
    userId: number;
    id: number;
    title: string;
    body: string;
    clickable?: boolean;
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
  }, [])

  var length: number = 0;

  if (comments !== undefined || comments !== null) {       //used to calculate the amount of comments on a post
    comments?.forEach(comment => {
      if (comment.postId === postData?.id) {
        length++;
      }
    });
  }

  return (
    <div>
      <Link to="/" className="absolute text-white p-7 text-2xl">✖ Close</Link>
      <div className='flex flex-col gap-20 bg-reddit-black px-[10%] p-10 pt-24'>
        {postData ? <Post key={postData.id} postId={postData.id} userId={postData.userId} title={postData.title} body={postData.body} likes={location.state.postLikes} interacted={location.state.interacted} clickable={false} /> : null}
        <hr></hr>
        <p className="text-white text-rig text-xl sm:ml-36">{length} Comments</p>
        {comments?.map((comment) => {
          if (comment.postId === postData?.id) {
            return (
              <Comment key={comment.id} id={comment.id} postId={comment.postId} name={comment.name} email={comment.email} body={comment.body} />
            )
          }
        })}
      </div>
    </div>
  )
}

export default PostPage;
