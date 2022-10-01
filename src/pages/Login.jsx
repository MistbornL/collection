import React, { useRef } from "react";
import { Menu } from "../components/Menu";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user/login", {})
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = "/";
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <header>
        <Menu />
      </header>

      <div style={{ marginTop: "100px" }} class="row justify-content-center ">
        <div class="col-sm-6">
          <div class="card">
            <div style={{ padding: "32px" }} class="card-body">
              <form style={{ gap: "20px" }} className="d-flex flex-column ">
                <h2 class="card-title">Login</h2>
                <div className="form-group w-100">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    ref={email}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                  />
                </div>

                <div className="form-group w-100">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    ref={password}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary w-25">
                    Login
                  </button>
                  <h4>
                    Don't have An Account <a href="/signup">Sign Up</a>
                  </h4>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
