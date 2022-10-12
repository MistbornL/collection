import axios from "axios";

export const HandleLogOut = async (token) => {
  await axios
    .get("http://localhost:5000/user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { email: localStorage.getItem("email") },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.clear();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
