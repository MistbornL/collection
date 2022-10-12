import React, { useRef } from "react";
import { Menu } from "../components/Menu";
import { HandleSignUp } from "../helper/HandleSignUp";
export const SignUp = () => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();

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
                <form style={{ width: "23rem" }}>
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "pacing1px" }}
                  >
                    Sign Up
                  </h3>

                  <div className="form mb-2">
                    <input
                      ref={firstName}
                      type="text"
                      placeholder="First Name"
                      id="firstName"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form mb-2">
                    <input
                      ref={lastName}
                      placeholder="Last Name"
                      type="text"
                      id="LastName"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form mb-2">
                    <input
                      ref={email}
                      type="email"
                      id="form2Example18"
                      placeholder="Email"
                      label="Email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form mb-2">
                    <input
                      ref={password}
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>

                  <div className="pt-1 mb-2">
                    <button
                      onClick={() => {
                        HandleSignUp(email, password, firstName, lastName);
                      }}
                      className="btn btn-info btn-lg btn-block"
                      type="button"
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
