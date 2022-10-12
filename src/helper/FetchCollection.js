import axios from "axios";

export const FetchCollection = async (email, setCollections) => {
  await axios
    .get(
      `https://collection-server-mistborn.herokuapp.com/collection/userCol`,
      {
        headers: {
          "content-type": "application/json",
        },
        params: {
          createdBy: email,
        },
      }
    )
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
