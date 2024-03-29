import axios from "axios";

export const ModifyCollection = async (
  token,
  id,
  title,
  description,
  navigate
) => {
  const data = {
    title: title.current.value,
    description: description.current.value,
  };
  await axios
    .put(`https://collection-server.vercel.app/collection/update/${id}`, data, {
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
