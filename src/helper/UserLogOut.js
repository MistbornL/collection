import axios from "axios";

export const HandleLogOut = async (token, navigate) => {
  await axios
    .get("https://collection-server.vercel.app/user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { email: localStorage.getItem("email") },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        localStorage.clear();
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
