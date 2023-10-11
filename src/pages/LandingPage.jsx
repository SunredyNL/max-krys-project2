import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import UserForm from "../components/UserForm";
import defaultAvatar from "../assets/uavatar.png";

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
      <div>
        {users.map((currentUser) => {
          return (
            <Link to={`/home-page/${currentUser.id}`} key={currentUser.id}>
              <div>
                {currentUser.avatarUrl === "default" ? (
                  <img className="profilePic" src={defaultAvatar} />
                ) : (
                  <img
                    className="profilePic"
                    src={currentUser.avatarUrl}
                    alt="User Avatar"
                  />
                )}
                <h2>{currentUser.name}</h2>
              </div>
            </Link>
          );
        })}
      </div>
      <div>
        <UserForm />
      </div>
    </div>
  );
}

export default LandingPage;
