import axios from "axios";

export const CreateCollectionApi = async (
  token,
  email,
  title,
  description,
  navigate,
  topic
) => {
  const data = {
    createdBy: email,
    title: title.current.value,
    description: description.current.value,
    topic: topic.current.value,
  };
  await axios
    .post(`http://localhost:5000/collection/create`, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        navigate("/account");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
