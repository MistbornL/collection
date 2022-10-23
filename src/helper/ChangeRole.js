import axios from "axios";
import { HandleLogOut } from "./UserLogOut";

export const HandleChangeRole = (users, token, setUsers, email, navigate) => {
  const selectedUsers = users.filter((user) => user.isChecked);

  selectedUsers.forEach((user) => {
    axios
      .put(
        `http://localhost:5000/users/changeRole/${user.email}`,
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
    if (user.isChecked && user.role === "user") {
      return { ...user, role: "admin" };
    } else if (
      user.isChecked &&
      user.role === "admin" &&
      user.email !== email
    ) {
      return { ...user, role: "user" };
    } else if (
      user.isChecked &&
      user.role === "admin" &&
      user.email === email
    ) {
      HandleLogOut(token);
      navigate("/");
      return { ...user, role: "user" };
    } else {
      return user;
    }
  });
  setUsers(updatedUsers);
};
