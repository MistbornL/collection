import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";

export const EditItem = () => {
  const { id } = useParams();
  const title = useRef();
  const description = useRef();
  const image = useRef();
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  console.log(email);

  const modifyItem = async () => {
    const updateData = {
      createdBy: email,
      id: id,
      title: title.current.value,
      description: description.current.value,
      image: image.current.value,
    };

    await axios
      .put(`http://localhost:5000/collection/update/item`, updateData, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          window.location.href = "/account";
        }
      })
      .catch((err) => {
        alert("something went wrong");
        console.log(err);
      });
  };

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
        let item = res.data.filter((item) => item.id !== id)[0];
        console.log(item);
        title.current.value = item.title;
        description.current.value = item.description;
        image.current.value = item.image;
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
      <main className="d-flex align-items-center justify-content-center mt-5">
        <div className="card  w-50 d-flex  justify-content-center ">
          <div className="card-body">
            <h1>Modify Item</h1>
            <h4 className="card-title">Title</h4>
            <div className="form-group">
              <input
                ref={title}
                type="text"
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <input
                ref={image}
                type="text"
                className="form-control mt-3"
                placeholder="image url"
              />
            </div>
            <h4 className="card-text">Description</h4>
            <div className="form-group">
              <textarea
                ref={description}
                style={{ resize: "none" }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
              />
            </div>
            <button className="btn bg-primary btn-lg mt-3" onClick={modifyItem}>
              Modify
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
