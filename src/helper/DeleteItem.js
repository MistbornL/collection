import axios from "axios";

export const DeleteItem = async (id, token, collections) => {
  await axios
    .delete(
      `https://collection-server.vercel.app/collection/delete/item`,

      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        collections.filter((item) => item._id !== id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
