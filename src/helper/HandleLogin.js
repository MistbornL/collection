import axios from "axios";

export const HandleLogin = async (email, password) => {
  localStorage.setItem("email", email.current.value);

  if (email.current.value !== "" && password.current.value !== "") {
    await axios
      .post("https://collection-server-mistborn.herokuapp.com/user/login", {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("language", res.data.user.language);
          window.location.href = "/";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 404) {
          alert("user does not exist");
        } else if (err.response.status === 403) {
          alert("password is incorrect");
        } else {
          alert("Something went wrong");
        }
      });
  } else {
    alert("Please enter email and password");
  }
};
