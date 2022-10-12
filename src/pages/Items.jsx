import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import axios from "axios";
import { CollectionItems } from "../components/CollectionItems";

export const Items = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const { email } = useParams();

  const fetchItems = async () => {
    await axios
      .get(
        `https://collection-server-mistborn.herokuapp.com/collection/userItems`,
        {
          headers: {
            "content-type": "application/json",
          },
          params: {
            CollectionId: id,
          },
        }
      )
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          items.filter((item) => item._id !== id);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);
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
                id={id}
              />
            );
          })
        ) : (
          <div className=" no-items">
            <h1 className="text-center">No Items</h1>
            <div className="d-flex justify-content-center gap-5 mb-5">
              <button
                onClick={() => {
                  window.location.href = `/collection/item/create/${id}/${email}`;
                }}
                className="btn btn-primary"
              >
                Create Item
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
