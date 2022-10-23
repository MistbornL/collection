import axios from "axios";

export const ModifyItem = async (
  id,
  token,
  title,
  description,
  image,
  multiSelections,
  navigate
) => {
  const data = {
    title: title.current.value,
    description: description.current.value,
    image: image.current.value,
    tags: multiSelections,
  };
  await axios
    .put(`http://localhost:5000/collection/item/update/${id}`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        navigate("/account");
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
