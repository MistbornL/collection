import axios from "axios";

export const PostItem = async (data, token) => {
  await axios
    .post(`http://localhost:5000/collection/create/item`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = "/account";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
