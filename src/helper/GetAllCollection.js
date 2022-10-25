import axios from "axios";

export const GetAllCollection = (setCollections) => {
  axios
    .get("https://collection-server-mistborn.herokuapp.com/collection/")
    .then((res) => {
      setCollections(res.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};
