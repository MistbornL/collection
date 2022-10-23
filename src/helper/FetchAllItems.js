import axios from "axios";

export const FetCchAllItems = async (setCollections) => {
  await axios
    .get(`http://localhost:5000/collection/item`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
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
