import React, { useRef } from "react";
import { Menu } from "../components/Menu";
import axios from "axios";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email.current.value);
    if (email.current.value !== "" && password.current.value !== "") {
      await axios
        .post("http://localhost:5000/user/login", {
          email: email.current.value,
          password: password.current.value,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
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
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit} style={{ width: "23rem" }}>
                <h3
                  class="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "pacing1px" }}
                >
                  Log in
                </h3>

                <div class="form-outline mb-4">
                  <input
                    ref={email}
                    type="email"
                    id="form2Example18"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form2Example18">
                    Email address
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    ref={password}
                    type="password"
                    id="form2Example28"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form2Example28">
                    Password
                  </label>
                </div>

                <div class="pt-1 mb-4">
                  <button class="btn btn-info btn-lg btn-block" type="button">
                    Login
                  </button>
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Don't have an account?
                  <a href="/signup" class="link-info">
                    Register here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
