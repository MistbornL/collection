import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import axios from "axios";

export const Collection = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = async (id) => {
    await axios
      .delete(
        `http://localhost:5000/collection/delete/item`,

        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { id: id },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          items.filter((item) => item._id !== id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(false);
    fetchItem();
  }, []);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      {!loading ? (
        <main>
          {items.map((item, index) => {
            return (
              <section
                key={index}
                className=""
                style={{ backgroundColor: "#8098d1" }}
              >
                <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 ">
                      <div
                        className="card mb-3"
                        style={{ borderRadius: ".5rem" }}
                      >
                        <div className="row g-0">
                          <div
                            className="justify-content-center d-flex "
                            style={{
                              borderTopLeftRadius: ".5rem",
                              borderBottomLeftRadius: ".5rem",
                            }}
                          >
                            <img
                              src={item.image}
                              alt="Avatar"
                              className="img-fluid my-5"
                              style={{ width: "250px" }}
                            />
                          </div>
                          <div className="col-md-5 w-100 ">
                            <div className="card-body p-4 ">
                              <h6>Information</h6>
                              <hr className="mt-0 mb-4" />
                              <div className="col  pt-2">
                                <div className="col-6 mb-5">
                                  <h6>title</h6>
                                  <p className="text-muted">{item.title}</p>
                                </div>

                                <div className="w-100 mb-5">
                                  <h6>Description</h6>
                                  <p className="text-muted">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center gap-5 mb-5">
                            <button
                              onClick={() => {
                                window.location.href = `/collection/item/create/${id}`;
                              }}
                              className="btn btn-primary"
                            >
                              Create Item
                            </button>
                            <button
                              onClick={() => deleteItem(item._id)}
                              className="btn btn-primary"
                            >
                              Delete Item
                            </button>
                            <button
                              onClick={() =>
                                (window.location.href = `/collection/item/edit/${item._id}`)
                              }
                              className="btn btn-primary"
                            >
                              Modify Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};
