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
    <div className="landing-page-container" style={{}}>
      <h1 className="landingHeading">Welcome to Gaming BMO!</h1>
        <div className="user-profile-container">
          {users.map((currentUser) => {
            return (
              <Link
                to={`/home-page/${currentUser.id}`}
                key={currentUser.id}
                className="user-profile-link"
              >
                <div className="user-profile">
                  {currentUser.avatarUrl === "default" ? (
                    <img className="profile-pic-landing" src={defaultAvatar} />
                  ) : (
                    <img
                      className="profile-pic-landing"
                      src={currentUser.avatarUrl}
                      alt="User Avatar"
                    />
                  )}
                  <h2 className="user-profile-heading">{currentUser.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
        <div>
          <UserForm className="userForm" />
        </div>
    </div>
  );
}

export default LandingPage;
