import React, { useRef } from "react";
import { Menu } from "../components/Menu";
import { HandleLogin } from "../helper/HandleLogin";

export const Login = () => {
  const email = useRef();
  const password = useRef();

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
              <form style={{ width: "23rem" }}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "pacing1px" }}
                >
                  Log in
                </h3>

                <div className="form mb-4">
                  <input
                    ref={email}
                    type="email"
                    placeholder="Email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form mb-4">
                  <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="pt-1 mb-4">
                  <button
                    onClick={() => {
                      HandleLogin(email, password);
                    }}
                    className="btn btn-info btn-lg btn-block"
                    type="button"
                  >
                    Login
                  </button>
                </div>

                <p className="small mb-5 pb-lg-2">
                  <a className="text-muted" href="#!">
                    Forgot password?
                  </a>
                </p>
                <p>
                  Don't have an account?
                  <a href="/signup" className="link-info">
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
