import axios from "axios";

export const GetCollectionData = async (token, title, description, id) => {
  await axios
    .get(
      `https://collection-server-mistborn.herokuapp.com/collection/specific/${id}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      let collection = res.data.filter((collection) => collection.id !== id)[0];
      console.log(collection);
      title.current.value = collection.title;
      description.current.value = collection.description;
    });
};
