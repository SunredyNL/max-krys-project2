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
    <form
      onSubmit={createNewUser}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label htmlFor="userName">
        Username:
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
      </label>
      <label htmlFor="avatarUrl">
        Avatar Url:
        <input
          type="text"
          name="avatarUrl"
          value={avatarUrl}
          onChange={(event) => {
            setAvatarUrl(event.target.value);
          }}
        />
      </label>
      <label htmlFor="description">
        Description:
        <input
          type="text"
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </label>
      <button type="submit" style={{ width: "200px" }}>
        Create User
      </button>
    </form>
  );
}

export default UserForm;
