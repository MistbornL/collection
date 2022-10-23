import axios from "axios";

export const FetchUsers = async (token, setUsers) => {
  await axios
    .get(`http://localhost:5000/users/`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
