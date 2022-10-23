import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { FetchAccount } from "../helper/FetchAccount";
import { FetCchAllItems } from "../helper/FetchAllItems";
import { TypeAnimation } from "react-type-animation";
import i18next from "i18next";

export const AllItems = () => {
  const token = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");
  const [user, setUser] = useState({});
  const [page, setPage] = useState(3);
  const { t } = useTranslation();
  console.log(collections);

  useEffect(() => {
    if (token) {
      FetchAccount(email, token, setUser);
      localStorage.setItem("theme", user.theme);
    }
  }, [email, user.theme, token]);

  useEffect(() => {
    if (collections.length >= 0) {
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    }
    FetCchAllItems(setCollections);
  }, [collections.length]);

  const deleteItem = async (id) => {
    console.log(id);
    await axios
      .delete(`http://localhost:5000/collection/delete/item/${id}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
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

  return (
    <div className="App">
      <header>
        <Menu />
      </header>

      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <main>
          {/* <TypeAnimation
            className="text-center mt-3"
            sequence={[i18next.t("item_welcome")]}
            wrapper="h1"
            cursor={false}
          /> */}
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
            {page < collections.length ? (
              <button
                onClick={() => setPage(page + 2)}
                className="btn btn-primary"
              >
                {t("item_load_more")}
              </button>
            ) : null}
          </div>
        </main>
      )}
    </div>
  );
};
