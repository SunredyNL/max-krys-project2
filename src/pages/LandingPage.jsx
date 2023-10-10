import { useEffect, useState } from "react";
import ProfileBadge from "../components/ProfileBadge";
import { Link } from "react-router-dom";

function LandingPage() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    const response = await fetch(
      `https://gamejournal-backend-2023.adaptable.app/users`,
      {
        method: "GET",
      }
    );
    console.log(response);
    if (response.status === 200) {
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    }
  }

  useEffect(() => {
    try {
      fetchUsers();
    } catch {
      (error) => {
        console.log(error);
      };
    }
  }, []);

  return (
    <div>
      <h1>Welcome!</h1>
        {users.map((currentUser) => {
          return (
            <Link to={`/home-page/${currentUser.id}`}>
            <div>
              <img src={currentUser.avatarUrl} alt="User profile picture" />
              <h2>{currentUser.name}</h2>
            </div>
          </Link>      
          );
        })}
    </div>
  );
}

export default LandingPage;
