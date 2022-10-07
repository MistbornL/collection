import axios from "axios";

export const ModifyItem = async (updateData, token, title, description) => {
  const data = {
    title: title.current.value,
    description: description.current.value,
  };
  await axios
    .put(`http://localhost:5000/collection/update/item`, updateData, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        window.location.href = "/account";
      }
    })
    .catch((err) => {
      alert("something went wrong");
      console.log(err);
    });
};
