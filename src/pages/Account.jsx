import axios from "axios";
import React, { useEffect } from "react";
import { Menu } from "../components/Menu";

export const Account = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [user, setUser] = React.useState({});

  const fetchAccount = async () => {
    await axios
      .get(`http://localhost:5000/users/profile`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:5000/users/delete`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createCollection = async () => {
    await axios
      .post(`http://localhost:5000/collections/create`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: email,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
        <section className="vh-100" style={{ backgroundColor: "#8098d1" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-6 mb-3 mb-lg-0">
                <div className="card mb-10" style={{ borderRadius: ".5rem" }}>
                  <div className="row g-0">
                    <div
                      className="col-md-4 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar"
                        className="img-fluid my-5"
                        style={{ width: "80px" }}
                      />
                      <h5>Marie Horwitz</h5>
                      <p>Web Designer</p>
                      <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted">{user.email}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Full Name</h6>
                            <p className="text-muted">
                              {user.firstName} {user.lastName}
                            </p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Status</h6>
                            <p className="text-muted">{user.role}</p>
                          </div>
                        </div>
                        <h6>Collections</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Recent</h6>
                            <p className="text-muted">Lorem ipsum</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Most Viewed</h6>
                            <p className="text-muted">Dolor sit amet</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                      <button className="btn btn-primary">
                        Create Collection
                      </button>
                      <button
                        onClick={handleDelete}
                        className="btn btn-primary"
                      >
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
