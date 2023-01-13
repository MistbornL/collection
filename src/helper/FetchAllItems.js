import axios from "axios";

export const FetCchAllItems = async (setItems) => {
  await axios
    .get(`https://collection-server.vercel.app/collection/item`, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      setItems(res.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};
