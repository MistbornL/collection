import axios from "axios";

export const FetCchAllItems = async (setCollections) => {
  await axios
    .get(`http://localhost:5000/collection/item`, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      setCollections(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
