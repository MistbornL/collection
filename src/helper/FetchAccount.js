import axios from "axios";

export const FetchAccount = async (email, token, setUser) => {
  await axios
    .get(`http://localhost:5000/users/profile`, {
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
