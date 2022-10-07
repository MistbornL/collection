import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../components/Menu";
import { CreateCollectionApi } from "../helper/CreateCollection";

export const CreateCollection = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const title = useRef();
  const description = useRef();

  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main className="d-flex align-items-center justify-content-center mt-5">
        <div className="card  w-50 d-flex  justify-content-center ">
          <div className="card-body">
            <h1>Create Collection</h1>
            <h4 className="card-title">Title</h4>
            <div className="form-group">
              <input
                ref={title}
                type="text"
                className="form-control"
                aria-describedby="helpId"
                placeholder="Title"
              />
            </div>
            <h4 className="card-text">Description</h4>
            <div className="form-group">
              <textarea
                ref={description}
                style={{ resize: "none" }}
                type="text"
                className="form-control form-control-lg"
                aria-describedby="helpId"
                placeholder="Description"
              />
            </div>
            <button
              className="btn bg-primary btn-lg mt-3"
              onClick={() =>
                CreateCollectionApi(token, email, title, description)
              }
            >
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
