import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  )
}

export default UserPage;