import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { CollectionCard } from "../components/Collection";
import { Menu } from "../components/Menu";

import { FetchCollection } from "../helper/FetchCollection";

export const Collection = () => {
  const [collections, setCollections] = useState([]);
  const { email } = useParams();
  const email2 = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchCollection(email, setCollections);
    setTimeout(() => {
      if (collections.length > 0) {
        setLoading(false);
      }
    }, [500]);
  }, [collections.length, setLoading, email]);
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
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status" />
            </div>
          ) : (
            <div className="card ">
              {collections.map((collection, index) => {
                return (
                  <CollectionCard
                    collection={collection}
                    collections={collections}
                    email={email}
                    email2={email2}
                    role={role}
                    index={index}
                    token={token}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
