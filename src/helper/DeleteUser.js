import axios from "axios";

export const DeleteUser = async (email, token, navigate) => {
  await axios
    .delete(`https://collection-server.vercel.app/users/delete/${email}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
