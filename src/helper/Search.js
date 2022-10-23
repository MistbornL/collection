import axios from "axios";

export const Search = async (searchTag, setItems) => {
  await axios
    .get(`http://localhost:5000/tag/search`, {
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
