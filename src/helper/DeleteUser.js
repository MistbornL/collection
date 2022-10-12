import axios from "axios";

export const DeleteUser = async (email, token) => {
  await axios
    .delete(
      `https://collection-server-mistborn.herokuapp.com/users/delete/${email}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        localStorage.clear();
        window.location.href = "/";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
