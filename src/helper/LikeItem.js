import axios from "axios";
import { FetCchAllItems } from "./FetchAllItems";

export const HandleLike = async (item, token, setItems) => {
  const likeData = { likedBy: localStorage.getItem("email") };
  await axios
    .put(
      `https://collection-server.vercel.app/collection/item/like/${item._id}`,
      likeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        FetCchAllItems(setItems);
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
