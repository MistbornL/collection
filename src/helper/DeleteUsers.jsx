import axios from "axios";

export const HandleDelete = (users, email, token, setUsers) => {
  const selectedUsers = users.filter((user) => user.isChecked);

  selectedUsers.forEach((user) => {
    axios
      .delete(
        `https://collection-server-mistborn.herokuapp.com/users/delete/${user.email}`,
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
  const updatedUsers = users.filter((user) => !user.isChecked);
  setUsers(updatedUsers);
};
