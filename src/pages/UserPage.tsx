import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Post from '../components/Post';

function UserPage() {

  function generateLikes() {      //generates a random amount of likes, between -100 and 100, just because if not, all of them would be 0
    return Math.floor(Math.random() * (101 + 100) - 100)
  }

  interface UserInterface {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  interface PostInterface {
    userId: number;
    id: number;
    title: string;
    body: string;
    clickable?: boolean;
  }

  const [user, setUser] = useState<UserInterface>();
  const [posts, setPosts] = useState<PostInterface[]>();

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);


  {/* <Post key={post.id} postId={post.id} userId={post.userId} title={post.title} body={post.body} likes={amountOfLikes} /> */ }


  return (
    <div>
      {/* <p>id: {user?.id}, name: {user?.name}, username: {user?.username}</p> */}
      <Link to="/" className="absolute text-white p-7 text-2xl">✖ Close</Link>
      <div className='flex flex-col gap-14 sm:gap-20 bg-reddit-black px-[10%] p-10 pt-24'>
        <div className='flex flex-col mx-auto items-center gap-2 sm:gap-4'>
          <p className='text-white text-2xl sm:text-3xl'>{user?.username}</p>
          <p className='text-white text-lg sm:text-xl'>{user?.name}</p>
        </div>
        <hr className='hidden sm:inline'></hr>
        {posts?.map((post) => {
          if (id) {
            if (post.userId === parseInt(id, 10)) {

              var amountOfLikes = generateLikes();

              return (
                <Post key={post.id} postId={post.id} userId={post.userId} title={post.title} body={post.body} likes={amountOfLikes} />
              )
            }
          }
        })}
      </div>

    </div>
  )
}

export default UserPage;