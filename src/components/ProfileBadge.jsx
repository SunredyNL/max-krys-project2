import { Link } from "react-router-dom";

function ProfileBadge(id, name, avatarUrl) {
  return (
    <Link to={`/home-page/${id}`}>
      <div>
        <img src={avatarUrl} alt="User profile picture" />
        <h2>{name}</h2>
      </div>
    </Link>
  );
}

export default ProfileBadge;
