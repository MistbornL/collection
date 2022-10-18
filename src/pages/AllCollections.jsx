import React, { useEffect, useState } from "react";

import { CollectionCard } from "../components/Collection";
import { Menu } from "../components/Menu";
import { GetAllCollection } from "../helper/GetAllCollection";

export const AllCollections = () => {
  const [collections, setCollections] = useState([]);
  const email2 = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllCollection(setCollections);
    setLoading(false);
  }, []);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
        <div
          style={{ marginTop: "100px" }}
          className="d-flex align-items-center gap-3  justify-content-center flex-column p-2"
        >
          {loading ? (
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            collections.map((collection, index) => {
              return (
                <div style={{ width: "500px" }} className="card mw-100 ">
                  <CollectionCard
                    token={token}
                    collection={collection}
                    collections={collections}
                    index={index}
                    email={collection.createdBy}
                    email2={email2}
                    role={role}
                  />
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};
