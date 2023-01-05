import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {

  interface UserInterface {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  const [users, setUsers] = useState<UserInterface[]>();

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      {users?.map((user) => <p>id: {user.id}, name: {user.name}, username: {user.username}</p>)}
    </div>
  )
}

export default UserPage;