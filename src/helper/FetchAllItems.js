import axios from "axios";

export const FetCchAllItems = async (setCollections) => {
  await axios
    .get(`https://collection-server-mistborn.herokuapp.com/collection/item`, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      setCollections(res.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};
