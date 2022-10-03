import React from "react";
import axios from "axios";
import { Menu } from "../components/Menu";

export const CreateCollection = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
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
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main className="d-flex align-items-center justify-content-center mt-5">
        <div class="card text-white bg-primary w-50 d-flex  justify-content-center ">
          <div class="card-body">
            <h1>Create Collection</h1>
            <h4 class="card-title">Title</h4>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                aria-describedby="helpId"
                placeholder="Title"
              />
            </div>
            <h4 class="card-text">Description</h4>
            <div class="form-group">
              <textarea
                style={{ resize: "none" }}
                type="text"
                class="form-control form-control-lg"
                aria-describedby="helpId"
                placeholder="Description"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
