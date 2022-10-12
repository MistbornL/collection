import axios from "axios";

export const ModifyCollection = async (
  token,
  id,
  title,
  description,
  multiSelections
) => {
  const data = {
    title: title.current.value,
    description: description.current.value,
    tags: multiSelections,
  };
  await axios
    .put(
      `https://collection-server-mistborn.herokuapp.com/collection/update/${id}`,
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
        window.location.href = "/account";
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
