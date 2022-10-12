import axios from "axios";

export const HandleSignUp = async (email, password, firstName, lastName) => {
  if (
    email.current.value === "" &&
    password.current.value === "" &&
    firstName.current.value === "" &&
    lastName.current.value === ""
  ) {
    alert("Please enter all the fields");
  } else {
    await axios
      .post("https://collection-server-mistborn.herokuapp.com/user/signup", {
        email: email.current.value,
        password: password.current.value,
        firstName: firstName.current.value,
        lastName: lastName.current.value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 409) {
          alert("email already exists");
        }
      });
  }
};
