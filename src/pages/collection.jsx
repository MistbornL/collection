import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import axios from "axios";

export const Collection = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    await axios
      .get(`http://localhost:5000/collection/userItem`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
        setItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItem();
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
                            <h6>title</h6>
                            <p className="text-muted">{item.title}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Full Name</h6>
                            <p className="text-muted">{item.description}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Status</h6>
                            {/* <p className="text-muted">{user.role}</p> */}
                          </div>
                        </div>
                        {/* <h6>Collections</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          {item.map((collection) => {
                            return (
                              <div key={collection._id} className="col-6 mb-3">
                                <h6>{collection.title}</h6>
                                <h7 className="text-muted">
                                  {collection.description}
                                </h7>
                                <button
                                  onClick={() => {
                                    window.location.href = `/collection/${collection._id}`;
                                  }}
                                  className="btn btn-primary "
                                >
                                  view collection
                                </button>
                              </div>
                            );
                          })}
                        </div> */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                      <button
                        onClick={() => {
                          window.location.href = "/collection/create";
                        }}
                        className="btn btn-primary"
                      >
                        Create Collection
                      </button>
                      <button
                        // onClick={handleDelete}
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
