import React, { useRef } from "react";
import axios from "axios";
import { Menu } from "../components/Menu";
import { useParams } from "react-router-dom";

export const CreateItem = () => {
  const token = localStorage.getItem("token");

  const title = useRef();
  const description = useRef();
  const image = useRef();
  const { id } = useParams();

  const postItem = async () => {
    await axios
      .post(
        `http://localhost:5000/collection/create/item`,
        {
          title: title.current.value,
          description: description.current.value,
          image: image.current.value,
          collectionId: id,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/account";
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
      <main className="d-flex align-items-center justify-content-center mt-5">
        <div className="card  w-50 d-flex  justify-content-center ">
          <div className="card-body">
            <h1>Create item</h1>
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
            <button className="btn bg-primary btn-lg mt-3" onClick={postItem}>
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
