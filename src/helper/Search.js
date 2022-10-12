import axios from "axios";

export const Search = async (searchTag, setItems) => {
  await axios
    .get(`https://collection-server-mistborn.herokuapp.com/tag/search`, {
      headers: {
        "content-type": "application/json",
      },
      params: {
        tag: searchTag,
      },
    })
    .then((res) => {
      console.log(res.data);
      setItems(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
