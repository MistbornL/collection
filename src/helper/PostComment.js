import axios from "axios";
import { FetCchAllItems } from "./FetchAllItems";

export const HandleComment = async (item, comments, setItems, token) => {
  const commentsData = {
    createdBy: localStorage.getItem("email"),
    comment: comments,
    createdAt: new Date().toLocaleString(),
  };
  await axios
    .put(
      `http://localhost:5000/collection/item/comment`,
      { id: item._id, comments: commentsData },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        FetCchAllItems(setItems);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
