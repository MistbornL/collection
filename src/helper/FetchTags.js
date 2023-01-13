import axios from "axios";

export const FetchTags = async (setTags) => {
  await axios
    .get(`https://collection-server.vercel.app/tag`, {
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
