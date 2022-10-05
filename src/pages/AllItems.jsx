import axios from "axios";
import React, { useState } from "react";
import { CollectionItems } from "../components/CollectionItems";
import { Menu } from "../components/Menu";

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

  const fetchAllCollections = async () => {
    await axios
      .get(`http://localhost:5000/collection/item`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useState(() => {
    fetchAllCollections();
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
            />
          );
        })}
      </main>
    </div>
  );
};
