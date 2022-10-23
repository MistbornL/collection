import axios from "axios";

export const HandleLogin = async (data, navigate) => {
  const { email, password } = data;

  localStorage.setItem("email", email);
  // collection-server-mistborn.herokuapp.com
  if (email !== "" && password !== "") {
    await axios
      .post(
        "http://localhost:5000/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("language", res.data.user.language);
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.status === 404) {
          alert("user does not exist");
        } else if (err.response.status === 401) {
          alert("password is incorrect");
        } else if (err.response.status === 403) {
          alert("user is not allowed to login");
        } else {
          alert("Something went wrong");
        }
      });
  } else {
    alert("Please enter email and password");
  }
};

export const HandleGoogleLogin = async (data, navigate) => {
  await axios
    .post(`http://localhost:5000/user/login`, {
      googleAccessToken: data,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.result.role);
        localStorage.setItem("email", res.data.result.email);
        localStorage.setItem("language", res.data.result.language);
        navigate("/");
      }
    })
    .catch((err) => {
      if (err.response.status === 404) {
        alert(err.response.data.message);
      } else if (err.response.status === 401) {
        alert("password is incorrect");
      } else if (err.response.status === 403) {
        alert("user is not allowed to login");
      } else {
        alert("Something went wrong");
      }
    });
};
