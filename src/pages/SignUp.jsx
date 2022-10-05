import React, { useRef } from "react";
import { Menu } from "../components/Menu";
import axios from "axios";
export const SignUp = () => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.current.value === "" &&
      password.current.value === "" &&
      firstName.current.value === "" &&
      lastName.current.value === ""
    ) {
      alert("Please enter all the fields");
    } else {
      await axios
        .post("http://localhost:5000/user/signup", {
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

  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
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
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "pacing1px" }}
                  >
                    Sign Up
                  </h3>

                  <div className="form-outline mb-2">
                    <input
                      ref={firstName}
                      type="text"
                      id="firstName"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="FirstName">
                      First Name
                    </label>
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      ref={lastName}
                      type="text"
                      id="LastName"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="LastName">
                      Last Name
                    </label>
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      ref={email}
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-2">
                    <input
                      ref={password}
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  <div className="pt-1 mb-2">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    have an account? Continue On
                    <a href="/" className="link-info">
                      Login Page
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
