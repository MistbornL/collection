import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import axios from "axios";
import { CollectionItems } from "../components/CollectionItems";

export const Collection = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  console.log(items);

  const fetchItem = async () => {
    await axios
      .get(`http://localhost:5000/collection/userItem`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
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
          items.filter((item) => item._id !== id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItem();
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
              <CollectionItems item={item} deleteItem={deleteItem} id={id} />
            );
          })
        ) : (
          <div className=" no-items">
            <h1 className="text-center">No Items</h1>
            <div className="d-flex justify-content-center gap-5 mb-5">
              <button
                onClick={() => {
                  window.location.href = `/collection/item/create/${id}`;
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
