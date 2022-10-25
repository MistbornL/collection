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
  const [customFields, setCustomFields] = useState([]);
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchTags(setTags);
    GetDataForItem(title, description, image, setCustomFields, token, id);
  }, [id, token]);

  const handleChange = (onChangeValue, i, label) => {
    const inputData = [...fields];
    const dict = {};
    dict[label] = onChangeValue.target.value;
    inputData[i] = dict;
    setFields(inputData);
  };

  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main className="p-3 d-flex align-items-center justify-content-center mt-5">
        <div
          style={{ width: "800px" }}
          className="card  d-flex  justify-content-center "
        >
          <div className="card-body">
            <h1>Modify Item</h1>

            <div className="form-group mt-3">
              <h4 className="card-title">Title</h4>
              <input
                ref={title}
                type="text"
                className="form-control"
                placeholder="Title"
              />
            </div>

            <div className="form-group mt-3">
              <h4 className="card-text">Image</h4>
              <input
                ref={image}
                type="text"
                className="form-control "
                placeholder="image url"
              />
            </div>

            <div className="form-group  mt-3">
              <h4 className="card-text">Tags</h4>
              <Typeahead
                id="basic-example"
                onChange={setMultiSelections}
                options={tags}
                multiple
                placeholder="Select Tag"
                selected={multiSelections}
              />
            </div>

            <div className="form-group mt-3">
              <h4 className="card-text">Description</h4>
              <textarea
                ref={description}
                style={{ resize: "none" }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
              />
            </div>
            {customFields.length > 0
              ? customFields.map((field, index) => {
                  return (
                    <div key={index} className="form-group mt-3">
                      <h4 className="card-text">{Object.keys(field)[index]}</h4>
                      <input
                        onChange={(e) => {
                          handleChange(e, index, Object.keys(field)[index]);
                        }}
                        type="text"
                        className="form-control "
                        placeholder={Object.keys(field)[index]}
                      />
                    </div>
                  );
                })
              : null}
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
                  navigate,
                  fields
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
