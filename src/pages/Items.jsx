import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import axios from "axios";
import { CollectionItems } from "../components/CollectionItems";
import { useNavigate } from "react-router-dom";
import { FetchItems } from "../helper/FetchItemsForCollections";

export const Items = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);
  const { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log(items);

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
    FetchItems(id, setItems);
    if (items.length >= 0) {
      setLoading(false);
    }
  }, [id, items.length]);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>

      <main>
        {!loading ? (
          items.reverse().map((item) => {
            return (
              <CollectionItems item={item} deleteItem={deleteItem} id={id} />
            );
          })
        ) : loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className=" no-items">
            <h1 className="text-center">No Items Were Found</h1>
            <div className="d-flex justify-content-center gap-5 mb-5">
              <button
                onClick={() => {
                  navigate(`/collection/item/create/${id}/${email}`);
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
