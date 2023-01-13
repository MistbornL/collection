import axios from "axios";
import { FetCchAllItems } from "./FetchAllItems";

export const HandleDisLike = async (item, token, setItems) => {
  console.log(token);
  const dislikeData = { disLikedBy: localStorage.getItem("email") };
  await axios
    .put(
      `https://collection-server.vercel.app/collection/item/dislike/${item._id}`,
      dislikeData,
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
