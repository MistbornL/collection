import React, { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useParams } from "react-router-dom";
import { Menu } from "../components/Menu";
import { FetchTags } from "../helper/FetchTags";
import { GetDataForItem } from "../helper/GetDataForITem";
import { ModifyItem } from "../helper/ModifyItem";
import { useNavigate } from "react-router-dom";

export const EditItem = () => {
  const { id } = useParams();
  const title = useRef();
  const description = useRef();
  const image = useRef();
  const token = localStorage.getItem("token");
  const [tags, setTags] = useState([]);
  const [multiSelections, setMultiSelections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchTags(setTags);
    GetDataForItem(title, description, image, token, id);
  }, [id, token]);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main className="d-flex align-items-center justify-content-center mt-5">
        <div className="card  w-50 d-flex  justify-content-center ">
          <div className="card-body">
            <h1>Modify Item</h1>
            <h4 className="card-title">Title</h4>
            <div className="form-group">
              <input
                ref={title}
                type="text"
                className="form-control"
                placeholder="Title"
              />
            </div>

            <div className="form-group">
              <h4 className="card-text">Image</h4>
              <input
                ref={image}
                type="text"
                className="form-control "
                placeholder="image url"
              />
            </div>
            <h4 className="card-text">Tags</h4>
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
                ref={description}
                style={{ resize: "none" }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
              />
            </div>
            <button
              className="btn bg-primary btn-lg mt-3"
              onClick={() => {
                ModifyItem(
                  id,
                  token,
                  title,
                  description,
                  image,
                  multiSelections,
                  navigate
                );
              }}
            >
              Modify
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
