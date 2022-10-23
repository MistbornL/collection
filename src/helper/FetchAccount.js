import axios from "axios";

export const FetchAccount = async (email, token, setUser) => {
  await axios
    .get(`https://collection-server-mistborn.herokuapp.com/users/profile`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        email: email,
      },
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
