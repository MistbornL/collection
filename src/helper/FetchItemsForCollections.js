import axios from "axios";

export const FetchItems = async (id, setItems) => {
  await axios
    .get(`https://collection-server.vercel.app/collection/userItems`, {
      headers: {
        "content-type": "application/json",
      },
      params: {
        CollectionId: id,
      },
    })
    .then((res) => {
      setItems(res.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};
