import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { Search } from "../helper/Search";

export const SearchResult = () => {
  const { tag } = useParams();
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("token");

  console.log(items);

  useEffect(() => {
    Search(tag, setItems);
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
        {items.length > 0 ? (
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
        ) : (
          <div className="no-items">
            <h1 className="text-center">
              {" "}
              No Items Go Back To Main <a href="/">Page</a>
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};
