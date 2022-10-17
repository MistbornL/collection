import axios from "axios";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { Search } from "../helper/Search";
import { Link } from "react-router-dom";

export const SearchResult = () => {
  const { tag } = useParams();
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  console.log(items);

  useEffect(() => {
    Search(tag, setItems);
    if (items.length > 0) {
      setLoading(false);
    } else if (items.length === 0) {
      setLoading(false);
    }
  }, [tag]);

  const deleteItem = async (id) => {
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

      <main>
        {!loading ? (
          items.map((item, index) => {
            return (
              <CollectionItems
                index={index}
                item={item}
                deleteItem={deleteItem}
                id={item.collectionId}
              />
            );
          })
        ) : loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="no-items">
            <h1 className="text-center">
              {t("search_item")} <Link to={"/"}>{t("search_page")}</Link>
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};
