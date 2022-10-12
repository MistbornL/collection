import axios from "axios";

export const FetchUsers = async (token, setUsers) => {
  await axios
    .get(`https://collection-server-mistborn.herokuapp.com/users/`, {
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
