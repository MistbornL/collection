import axios from "axios";

export const FetchCollection = async (email, setCollections) => {
  await axios
    .get(`http://localhost:5000/collection/userCol`, {
      headers: {
        "content-type": "application/json",
      },
      params: {
        createdBy: email,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        setCollections(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
