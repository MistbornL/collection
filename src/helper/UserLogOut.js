import axios from "axios";

export const HandleLogOut = async (token, navigate) => {
  await axios
    .get("https://collection-server-mistborn.herokuapp.com/user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { email: localStorage.getItem("email") },
    })
    .then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
