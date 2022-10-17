import React, { useEffect, useState } from "react";

import { CollectionCard } from "../components/Collection";
import { Menu } from "../components/Menu";
import { GetAllCollection } from "../helper/GetAllCollection";

export const AllCollections = () => {
  const [collections, setCollections] = useState([]);
  const email2 = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    GetAllCollection(setCollections);
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
          {collections.map((collection, index) => {
            return (
              <div style={{}} className="card mw-100 ">
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
          })}
        </div>
      </main>
    </div>
  );
};
