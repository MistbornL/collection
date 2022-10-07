import axios from "axios";
import React, { useState } from "react";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { FetCchAllItems } from "../helper/FetchAllItems";

export const AllItems = () => {
  const token = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);

  const handleComment = async (id) => {
    await axios
      .post(
        `http://localhost:5000/collection/add/comment`,
        { id: id },
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = async (id) => {
    await axios
      .delete(
        `http://localhost:5000/collection/delete/item`,

        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: { id: id },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          collections.filter((item) => item._id !== id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useState(() => {
    FetCchAllItems(setCollections);
  }, []);
  return (
    <div className="App">
      <Menu />

      <main>
        {collections.map((item) => {
          return (
            <CollectionItems
              handleComment={handleComment}
              key={item._id}
              item={item}
              id={item.collectionId}
              deleteItem={deleteItem}
            />
          );
        })}
      </main>
    </div>
  );
};
