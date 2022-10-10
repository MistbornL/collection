import axios from "axios";
import React, { useState } from "react";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";
import { FetCchAllItems } from "../helper/FetchAllItems";

export const AllItems = () => {
  const token = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);

  const handleComment = async (id, comments, email) => {
    const commentsData = {
      createdBy: email,
      comment: comments,
      createdAt: new Date().toLocaleString(),
    };
    await axios
      .put(
        `http://localhost:5000/collection/item/comment`,
        { id: id, comments: commentsData },
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

  useState(() => {
    FetCchAllItems(setCollections);
  }, []);
  return (
    <div className="App">
      <Menu />

      <main>
        {collections.map((item, index) => {
          return (
            <CollectionItems
              handleComment={handleComment}
              key={index}
              item={item}
              itemId={item._id}
              id={item.collectionId}
              deleteItem={deleteItem}
            />
          );
        })}
      </main>
    </div>
  );
};
