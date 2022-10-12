import axios from "axios";

export const FetchTags = async (setTags) => {
  await axios
    .get(`https://collection-server-mistborn.herokuapp.com/tag`, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      setTags(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
