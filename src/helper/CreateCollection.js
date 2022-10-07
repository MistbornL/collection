import axios from "axios";

export const CreateCollectionApi = async (token, email, title, description) => {
  const data = {
    createdBy: email,
    title: title.current.value,
    description: description.current.value,
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
        window.location.href = "/account";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
