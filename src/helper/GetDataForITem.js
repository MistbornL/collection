import axios from "axios";

export const GetDataForItem = async (
  title,
  description,
  image,
  setCustomFields,
  token,
  id
) => {
  await axios
    .get(
      `https://collection-server-mistborn.herokuapp.com/collection/userItem`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      }
    )
    .then((res) => {
      let item = res.data.filter((item) => item.id !== id)[0];
      console.log(item);
      title.current.value = item.title;
      description.current.value = item.description;
      image.current.value = item.image;
      setCustomFields(item.customFields);
    })
    .catch((err) => {
      console.log(err);
    });
};
