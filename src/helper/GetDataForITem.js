import axios from "axios";

export const GetDataForItem = async (title, description, image, token, id) => {
  await axios
    .get(`http://localhost:5000/collection/userItem`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    })
    .then((res) => {
      let item = res.data.filter((item) => item.id !== id)[0];
      console.log(item);
      title.current.value = item.title;
      description.current.value = item.description;
      image.current.value = item.image;
    })
    .catch((err) => {
      console.log(err);
    });
};
