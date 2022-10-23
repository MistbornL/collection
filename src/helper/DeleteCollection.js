import axios from "axios";

export const DeleteCollection = async (id, token, collections) => {
  await axios
    .delete(
      `https://collection-server-mistborn.herokuapp.com/collection/delete/${id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        window.location.reload();
        console.log(res.data);
        collections.filter((collection) => collection._id !== id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
