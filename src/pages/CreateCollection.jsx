import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { CreateCollectionApi } from "../helper/CreateCollection";
import { FetchAccount } from "../helper/FetchAccount";
import { useNavigate } from "react-router-dom";

export const CreateCollection = () => {
  const token = localStorage.getItem("token");
  var email2 = localStorage.getItem("email");
  const title = useRef();
  const [user, setUser] = useState({});
  const description = useRef();
  var { email } = useParams();
  const navigate = useNavigate();

  const handleCreate = () => {
    if (user.role === "admin" && email !== email2) {
      CreateCollectionApi(token, email, title, description, navigate);
      console.log("b");
    } else if (email2 !== "admin@gmail.com" && email === email2) {
      CreateCollectionApi(token, email2, title, description, navigate);
      console.log("c");
    } else {
      CreateCollectionApi(token, email2, title, description, navigate);
    }
  };
  useEffect(() => {
    FetchAccount(email2, token, setUser);
  }, [email2, token]);
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
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
