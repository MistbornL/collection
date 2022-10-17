import axios from "axios";

export const HandleSignUp = async (data, navigate) => {
  await axios
    .post("https://collection-server-mistborn.herokuapp.com/user/signup", {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("User Created Successfully");
        navigate("/login");
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response.status === 409) {
        alert("email already exists");
      }
    });
};
