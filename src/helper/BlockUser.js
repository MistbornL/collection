import axios from "axios";

export const handleBlock = (users, token, email, setUsers, navigate) => {
  const selectedUsers = users.filter((user) => user.isChecked);

  selectedUsers.forEach((user) => {
    axios
      .put(
        `https://collection-server.vercel.app/users/block/${user.email}`,
        {},
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (user.email === email) {
      localStorage.clear();
      navigate("/");
    }
  });
  const updatedUsers = users.map((user) => {
    if (user.isChecked) {
      return { ...user, status: "Blocked" };
    } else {
      return user;
    }
  });
  setUsers(updatedUsers);
};
