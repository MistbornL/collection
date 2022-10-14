import axios from "axios";

export const GetAllCollection = (setCollections) => {
  axios
    .get("http://collection-server-mistborn.herokuapp.com/collection/")
    .then((res) => {
      setCollections(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
