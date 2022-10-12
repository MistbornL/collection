import axios from "axios";

export const HandleLike = async (item, token) => {
  const likeData = { likedBy: localStorage.getItem("email") };
  await axios
    .put(
      `http://localhost:5000/collection/item/like/${item._id}`,
      { likeData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
