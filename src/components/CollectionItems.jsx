import React, { useRef } from "react";

export const CollectionItems = ({
  item,
  handleComment,
  id,
  deleteItem,
  index,
  itemId,
}) => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const comment = useRef();

  return (
    <section key={index} style={{ backgroundColor: "#8098d1" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 ">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div
                  className="justify-content-center d-flex "
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <img
                    src={item.image}
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="col-md-5 w-100 ">
                  <div className="card-body p-4 ">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="col  pt-2">
                      <div className="col-6 mb-5">
                        <h6>Created By</h6>
                        <a href={`/collection/${item.createdBy}`}>
                          {item.createdBy}
                        </a>
                      </div>
                      <div className="col-6 mb-5">
                        <h6>title</h6>
                        <p className="text-muted">{item.title}</p>
                      </div>

                      <div className="col-6 mb-5">
                        <h6>Tags</h6>
                        <div>
                          {item.tags.map((tag, index) => {
                            return (
                              <span
                                style={{ cursor: "pointer", fontSize: "15px" }}
                                onClick={() => {
                                  window.location.href = `/search/${tag}`;
                                }}
                                key={index}
                                className="badge rounded-pill bg-primary w-25"
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="w-100 mb-5">
                        <h6>Description</h6>
                        <p className="text-muted">{item.description}</p>
                      </div>
                      {token ? (
                        <div className="w-100 mb-5  ">
                          <h6>Comment</h6>
                          <textarea
                            ref={comment}
                            style={{ resize: "none" }}
                            type="text"
                            className="form-group w-100 "
                          />
                          <button
                            onClick={() =>
                              handleComment(
                                itemId,
                                comment.current.value,
                                email
                              )
                            }
                            type="button"
                            className="btn btn-primary "
                          >
                            comment
                          </button>
                          <p>
                            to see comments visit <a href="/">Item</a>
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {role === "admin" || item.createdBy === email ? (
                  <div className="d-flex justify-content-center gap-5 mb-5">
                    <button
                      onClick={() => {
                        window.location.href = `/collection/item/create/${id}/${item.createdBy}`;
                      }}
                      className="btn btn-primary"
                    >
                      Create Item
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                      className="btn btn-primary"
                    >
                      Delete Item
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/collection/item/edit/${item._id}`)
                      }
                      className="btn btn-primary"
                    >
                      Modify Item
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
