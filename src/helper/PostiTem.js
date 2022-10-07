import axios from "axios";

export const PostItem = async (email, title, description, image, id, token) => {
  const data = {
    createdBy: email,
    title: title.current.value,
    description: description.current.value,
    image: image.current.value,
    collectionId: id,
  };
  await axios
    .post(`http://localhost:5000/collection/create/item`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.href = "/account";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
