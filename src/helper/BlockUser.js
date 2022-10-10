import axios from "axios";

export const handleBlock = (users, token, email, setUsers) => {
  const selectedUsers = users.filter((user) => user.isChecked);

  selectedUsers.forEach((user) => {
    axios
      .put(
        `http://localhost:5000/users/block/${user.email}`,
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
      localStorage.removeItem("token");
      window.location.href = "/";
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
