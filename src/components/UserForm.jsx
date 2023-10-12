import { useState } from "react";

function UserForm() {
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("default");
  const [description, setDescription] = useState("");

  async function createNewUser(event) {
    event.preventDefault();

    const payload = {
      name: userName,
      avatarUrl: avatarUrl,
      description: description,
      comments: [],
      likes: 0,
      games: [],
    };
    try {
      const response = await fetch(
        `https://gamejournal-backend-2023.adaptable.app/users`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const currentGame = await response.json();
        console.log(currentGame);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={createNewUser} className="create-user-form">
      <label htmlFor="userName">Username: </label>
      <input
        type="text"
        name="userName"
        id="userName"
        value={userName}
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />

      <label htmlFor="avatarUrl">Avatar Url: </label>
      <input
        type="text"
        name="avatarUrl"
        id="avatarUrl"
        value={avatarUrl}
        onChange={(event) => {
          setAvatarUrl(event.target.value);
        }}
      />

      <label htmlFor="description">Description: </label>
      <input
        type="text"
        name="description"
        value={description}
        id="description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <button
        type="submit"
        className="create-user-button"
        style={{ width: "10rem" }}
      >
        Create User
      </button>
    </form>
  );
}

export default UserForm;
