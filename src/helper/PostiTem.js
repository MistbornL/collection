import axios from "axios";

export const PostItem = async (
  email,
  title,
  description,
  image,
  id,
  token,
  multiSelections,
  navigate
) => {
  const data = {
    createdBy: email,
    title: title.current.value,
    description: description.current.value,
    image: image.current.value,
    collectionId: id,
    tags: multiSelections,
  };
  await axios
    .post(
      `https://collection-server-mistborn.herokuapp.com/collection/create/item`,
      data,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        navigate("/account");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
