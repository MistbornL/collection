import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const [page, setPage] = useState(3);
  const { t } = useTranslation();
  console.log(loading);
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

  useEffect(() => {
    if (collections.length >= 0) {
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    }
    FetCchAllItems(setCollections);
  }, [collections.length]);
  return (
    <div className="App">
      <Menu />

      {loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <main>
          {collections.slice(0, page).map((item, index) => {
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
          <div className="w-75 d-flex justify-content-end">
            <button
              onClick={() => setPage(page + 1)}
              className="btn btn-primary"
            >
              {t("item_load_more")}
            </button>
          </div>
        </main>
      )}
    </div>
  );
};
