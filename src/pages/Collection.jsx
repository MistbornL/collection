import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { DeleteCollection } from "../helper/DeleteCollection";

import { FetchCollection } from "../helper/FetchCollection";

export const Collection = () => {
  const [collections, setCollections] = useState([]);

  const { email } = useParams();
  const email2 = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useState(() => {
    FetchCollection(email, setCollections);
  }, []);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
        <div
          style={{ marginTop: "100px" }}
          className="d-flex justify-content-center "
        >
          <div className="card">
            {collections.map((collection, index) => {
              return (
                <div
                  key={index}
                  style={{ padding: "32px" }}
                  className="card-body "
                >
                  <h2 className="card-title">
                    Created By: {collection.createdBy}
                  </h2>
                  <h2 className="card-title">Title: {collection.title}</h2>

                  <p className="card-text">
                    Description: {collection.description}
                  </p>
                  <h2 className="card-title">Tags: {collection.tags}</h2>
                  <button
                    onClick={() => {
                      window.location.href = `/collection/items/${collection._id}/${email}`;
                    }}
                    className="btn btn-primary"
                  >
                    View Items
                  </button>
                  {role === "admin" || email2 === collection.createdBy ? (
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          window.location.href = `/collection/create/${collection.createdBy}`;
                        }}
                        className="btn btn-primary"
                      >
                        Create Collection
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = `/collection/update/${collection._id}`;
                        }}
                        className="btn btn-primary"
                      >
                        Modify Collection
                      </button>

                      <button
                        onClick={() =>
                          DeleteCollection(collection._id, token, collections)
                        }
                        className="btn btn-primary"
                      >
                        Delete Collection
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
