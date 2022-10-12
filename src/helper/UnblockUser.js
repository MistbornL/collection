import axios from "axios";

export const HandleUnblock = (users, token, setUsers) => {
  const selectedUsers = users.filter((user) => user.isChecked);

  selectedUsers.forEach((user) => {
    axios
      .put(
        `https://collection-server-mistborn.herokuapp.com/users/unblock/${user.email}`,
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
  });
  const updatedUsers = users.map((user) => {
    if (user.isChecked) {
      return { ...user, status: "Offline" };
    } else {
      return user;
    }
  });
  setUsers(updatedUsers);
};
