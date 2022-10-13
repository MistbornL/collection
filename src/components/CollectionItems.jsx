import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { HandleDisLike } from "../helper/DisLikeITem";
import { HandleLike } from "../helper/LikeItem";
import { HandleComment } from "../helper/PostComment";

export const CollectionItems = ({
  item,
  id,
  deleteItem,
  index,
  setItems,
  itemId,
}) => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

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
                    <h6> {t("item_information")}</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="col  pt-2">
                      <div className="col-6 mb-5">
                        <h6>{t("item_creator")}</h6>
                        <a href={`/collection/${item.createdBy}`}>
                          {item.createdBy}
                        </a>
                      </div>
                      <div className="col-6 mb-5">
                        <h6>{t("item_title")}</h6>
                        <p className="text-muted">{item.title}</p>
                      </div>

                      <div className="col-6 mb-5">
                        <h6>{t("item_tags")}</h6>
                        <div>
                          {item.tags.map((tag, index) => {
                            return (
                              <span
                                style={{
                                  cursor: "pointer",
                                  fontSize: "15px",
                                  width: "fit-content",
                                }}
                                onClick={() => {
                                  window.location.href = `/search/${tag}`;
                                }}
                                key={index}
                                className="badge d-flex mb-3 rounded-pill bg-primary "
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="w-100 mb-5">
                        <h6>{t("item_description")}</h6>
                        <p className="text-muted">{item.description}</p>
                      </div>
                      {token ? (
                        <>
                          <div className="w-100 mb-5">
                            {item.liked ? (
                              <button
                                onClick={() =>
                                  HandleDisLike(item, token, setItems)
                                }
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                {t("item_dislike")}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() =>
                                  HandleLike(item, token, setItems)
                                }
                              >
                                {t("item_like")}
                              </button>
                            )}
                            {item.likes.length === 0 ? (
                              <h6> {t("item_no_likes")}</h6>
                            ) : item.likes.length === 1 ? (
                              <h6>
                                {t("item_liked_by")} {item.likes[0]}
                              </h6>
                            ) : (
                              <h6>
                                {t("item_liked_by")} {item.likes[0]}{" "}
                                {t("item_and")} {item.likes.length - 1}{" "}
                                {t("item_others")}
                              </h6>
                            )}
                          </div>
                          <div
                            style={{ height: "40px" }}
                            className="w-100 mb-5 d-flex justify-content-between"
                          >
                            <textarea
                              ref={comment}
                              style={{ resize: "none" }}
                              placeholder="Add a comment"
                              type="text"
                              className="form-group w-75 "
                            />
                            <button
                              onClick={() =>
                                HandleComment(
                                  item,
                                  comment.current.value,
                                  setItems,
                                  token
                                )
                              }
                              type="button"
                              className="btn btn-primary "
                            >
                              {t("item_comment")}
                            </button>
                          </div>

                          <div className="w-100 mb-5">
                            <h5> {t("item_comments")}</h5>
                            {item.comments.length === 0 ? (
                              <h6> {t("item_no_comments")}</h6>
                            ) : (
                              item.comments.map((comment, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="d-flex flex-column "
                                  >
                                    <h6 style={{}}>
                                      {comment.createdBy}: {comment.comment}
                                    </h6>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </>
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
                      {t("item_create")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                      className="btn btn-primary"
                    >
                      {t("item_delete")}
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/collection/item/edit/${item._id}`)
                      }
                      className="btn btn-primary"
                    >
                      {t("item_edit")}
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
