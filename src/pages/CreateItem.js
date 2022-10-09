import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../components/Menu";
import { useParams } from "react-router-dom";
import { PostItem } from "../helper/PostiTem";
import { FetchTags } from "../helper/FetchTags";

import { Typeahead } from "react-bootstrap-typeahead";

export const CreateItem = () => {
  const token = localStorage.getItem("token");

  const title = useRef();
  const description = useRef();
  const image = useRef();
  const { id } = useParams();
  const { email } = useParams();
  const [tags, setTags] = useState([]);
  const [multiSelections, setMultiSelections] = useState([]);

  useEffect(() => {
    FetchTags(setTags);
  }, []);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main className="d-flex align-items-center justify-content-center mt-5">
        <div className="card  w-50 d-flex  justify-content-center ">
          <div className="card-body">
            <h1>Create item</h1>
            <h4 className="card-title">Title</h4>
            <div className="form-group">
              <input
                ref={title}
                required
                type="text"
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <input
                ref={image}
                type="text"
                className="form-control mt-3"
                placeholder="image url"
              />
            </div>
            <div className="form-group  mt-3">
              <Typeahead
                id="basic-example"
                onChange={setMultiSelections}
                options={tags}
                multiple
                placeholder="Select Tag"
                selected={multiSelections}
              />
            </div>
            <h4 className="card-text">Description</h4>
            <div className="form-group">
              <textarea
                required
                ref={description}
                style={{ resize: "none" }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
              />
            </div>
            <button
              className="btn bg-primary btn-lg mt-3"
              onClick={() =>
                PostItem(
                  email,
                  title,
                  description,
                  image,
                  id,
                  token,
                  multiSelections
                )
              }
            >
              Create
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
