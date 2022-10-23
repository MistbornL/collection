import axios from "axios";

export const FetchItems = async (id, setItems) => {
  await axios
    .get(`http://localhost:5000/collection/userItems`, {
      headers: {
        "content-type": "application/json",
      },
      params: {
        CollectionId: id,
      },
    })
    .then((res) => {
      setItems(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
