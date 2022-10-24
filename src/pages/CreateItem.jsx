import React, { Fragment, useEffect, useRef, useState } from "react";
import { Menu } from "../components/Menu";
import { useParams } from "react-router-dom";
import { PostItem } from "../helper/PostiTem";
import { FetchTags } from "../helper/FetchTags";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import { FieldPop } from "../components/popup/FieldPop";

export const CreateItem = () => {
  const token = localStorage.getItem("token");
  const title = useRef();
  const description = useRef();
  const image = useRef();
  const { id } = useParams();
  const { email } = useParams();
  const [tags, setTags] = useState([]);
  const [multiSelections, setMultiSelections] = useState([]);
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const [pop, setPop] = useState(false);
  const [labels, setLabels] = useState([]);

  const handleAdd = () => {
    setFields([...fields, []]);
  };

  const handleChange = (onChangeValue, i, label) => {
    const inputData = [...fields];
    const dict = {};
    dict[label] = onChangeValue.target.value;
    inputData[i] = dict;
    setFields(inputData);
  };

  useEffect(() => {
    FetchTags(setTags);
  }, [fields]);
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
              <small className="d-flex  form-text text-muted">
                *optional img field
              </small>
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
            <div className="form-group mt-3">
              <textarea
                required
                ref={description}
                style={{ resize: "none" }}
                type="text"
                className="form-control form-control-lg"
                placeholder="Description"
              />
            </div>

            <div className="form-group mt-3">
              {fields.map((data, index) => {
                return (
                  <Fragment key={index}>
                    <h4 className="card-title">{labels[index]}</h4>
                    <div className="form-group">
                      <input
                        required
                        onChange={(e) => handleChange(e, index, labels[index])}
                        type="text"
                        className="form-control"
                        placeholder={labels[index]}
                      />
                    </div>
                  </Fragment>
                );
              })}
            </div>

            <div className="d-flex gap-3">
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
                    multiSelections,
                    fields,
                    navigate
                  )
                }
              >
                Create
              </button>
              <button
                onClick={() => {
                  setPop(true);
                }}
                className="btn bg-primary btn-lg mt-3"
              >
                Add Custom Field
              </button>
              {pop ? (
                <FieldPop
                  handleAdd={handleAdd}
                  setLabels={setLabels}
                  labels={labels}
                  setPop={setPop}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
