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
      if (res.status === 200) {
        setCollections(res.data.reverse());
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
