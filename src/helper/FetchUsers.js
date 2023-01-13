import axios from "axios";

export const FetchUsers = async (token, setUsers) => {
  await axios
    .get(`https://collection-server.vercel.app/users/`, {
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
