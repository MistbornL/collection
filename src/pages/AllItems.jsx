import axios from "axios";
import React, { useState, useEffect } from "react";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { FetchAccount } from "../helper/FetchAccount";
import { FetCchAllItems } from "../helper/FetchAllItems";

export const AllItems = () => {
  const token = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      FetchAccount(email, token, setUser);
      localStorage.setItem("theme", user.theme);
    }
  }, [email, user.theme, token]);

  const deleteItem = async (id) => {
    console.log(id);
    await axios
      .delete(
        `https://collection-server-mistborn.herokuapp.com/collection/delete/item/${id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          collections.filter((item) => item._id !== id);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useState(() => {
    setLoading(false);
    FetCchAllItems(setCollections);
  }, []);
  return (
    <div className="App">
      <Menu />

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          {collections.map((item, index) => {
            return (
              <CollectionItems
                key={index}
                item={item}
                itemId={item._id}
                setItems={setCollections}
                id={item.collectionId}
                deleteItem={deleteItem}
              />
            );
          })}
        </main>
      )}
    </div>
  );
};
