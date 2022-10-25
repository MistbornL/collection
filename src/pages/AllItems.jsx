import axios from "axios";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CollectionCard } from "../components/Collection";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { FetchAccount } from "../helper/FetchAccount";
import { FetCchAllItems } from "../helper/FetchAllItems";
import { GetAllCollection } from "../helper/GetAllCollection";

export const AllItems = () => {
  const token = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [user, setUser] = useState({});
  const [page, setPage] = useState(3);
  const [showItems, setShowItems] = useState(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      FetchAccount(email, token, setUser);
      localStorage.setItem("theme", user.theme);
    }
  }, [email, user.theme, token]);

  useEffect(() => {
    if (items.length >= 0) {
      setTimeout(() => {
        setLoading(false);
      }, [500]);
    }
    FetCchAllItems(setItems);
    GetAllCollection(setCollections);
  }, [collections.length]);

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
        <main className="p-3 g-0 ">
          <h1 className="text-center mt-3">{t("item_welcome")}</h1>
          <div className=" d-flex justify-content-center mt-4 gap-3">
            <button
              id="itemCol"
              className=" btn btn-outline  my-2 my-sm-0"
              type="button"
              onClick={() => setShowItems(true)}
            >
              {t("menu_items")}
            </button>
            <button
              id="itemCol"
              className="btn btn-outline  my-2 my-sm-0"
              type="button"
              onClick={() => setShowItems(false)}
            >
              {t("menu_collections")}
            </button>
          </div>
          <div className="mt-5 gap-5 d-flex justify-content-center flex-column align-items-center">
            {showItems
              ? items.slice(0, page).map((item, index) => {
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
                })
              : collections.map((collection) => {
                  return (
                    <div
                      key={collection._id}
                      style={{ width: "500px" }}
                      id="collCard"
                      className="card mw-100 "
                    >
                      <CollectionCard
                        token={token}
                        collection={collection}
                        collections={collections}
                        email={collection.createdBy}
                        email2={email}
                        role={role}
                      />
                    </div>
                  );
                })}
          </div>
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
