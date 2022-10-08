import axios from "axios";

export const FetchTags = async (setTags) => {
  await axios
    .get(`http://localhost:5000/tag`, {
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
