import axios from "axios";

export const GetAllCollection = (setCollections) => {
  axios
    .get("http://localhost:5000/collection/")
    .then((res) => {
      setCollections(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
