import axios from "axios";

export const ModifyItem = async (
  id,
  token,
  title,
  description,
  image,
  multiSelections,
  navigate,
  fields
) => {
  const data = {
    title: title.current.value,
    description: description.current.value,
    image: image.current.value,
    tags: multiSelections,
    customFields: fields,
  };
  await axios
    .put(
      `https://collection-server.vercel.app/collection/item/update/${id}`,
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
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
