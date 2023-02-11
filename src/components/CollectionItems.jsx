import React, { Fragment, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HandleDisLike } from "../helper/DisLikeITem";
import { HandleLike } from "../helper/LikeItem";
import { HandleComment } from "../helper/PostComment";
import { useNavigate } from "react-router-dom";
import { Popup } from "./popup/PopUp";
import { Link } from "react-router-dom";

export const CollectionItems = ({ item, id, deleteItem, setItems }) => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pop, setPop] = React.useState(false);
  const comment = useRef();
  const [resize, setResize] = useState(false);

  return (
    <section key={item._id}>
      <div style={{ maxWidth: "820px" }} className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-10 ">
            <div
              id="section"
              className="card mb-3"
              style={{ borderRadius: ".5rem" }}
            >
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
                    alt={item.image !== "" ? "img" : null}
                    className="img-fluid my-5"
                    onClick={() => setResize(!resize)}
                    style={
                      resize
                        ? {
                            transform: "scale(1.5)",
                            cursor: "zoom-out",
                            borderRadius: ".5rem",
                            transition: "transform 0.25s ease",
                          }
                        : {
                            width: "250px",
                            cursor: "zoom-in",
                            borderRadius: ".5rem",
                            transition: "transform 0.25s ease",
                          }
                    }
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
                                key={index}
                                style={{
                                  cursor: "pointer",
                                  fontSize: "15px",
                                  width: "fit-content",
                                }}
                                onClick={() => {
                                  navigate(`/search/${tag}`);
                                }}
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

                      <div className="col-6 mb-5">
                        {item.customFields.length > 0
                          ? item.customFields.map((fields, index) => {
                              return (
                                <Fragment key={index}>
                                  <h6>{Object.keys(fields)[index]}</h6>
                                  <p className="text-muted">
                                    {Object.values(fields)[index]}
                                  </p>
                                </Fragment>
                              );
                            })
                          : null}
                      </div>

                      {token ? (
                        <>
                          <div className="w-100 mb-5">
                            {item.likes.includes(email) ? (
                              <button
                                onClick={() =>
                                  HandleDisLike(item, token, setItems)
                                }
                                type="button"
                                className="btn btn-outline-primary mb-3"
                              >
                                {t("item_dislike")}
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-outline-primary mb-3"
                                onClick={() =>
                                  HandleLike(item, token, setItems)
                                }
                              >
                                {t("item_like")}
                              </button>
                            )}

                            {/* liked by */}
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
                                <span
                                  onClick={() => setPop(true)}
                                  style={{
                                    cursor: "pointer",
                                    color: "cornflowerblue",
                                  }}
                                >
                                  {t("item_others")}
                                </span>
                                {pop && <Popup setPop={setPop} item={item} />}
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
                              onClick={() => {
                                HandleComment(
                                  item,
                                  comment.current.value,
                                  setItems,
                                  token
                                );
                                comment.current.value = "";
                              }}
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
                                      <Link
                                        to={`collection/${comment.createdBy}`}
                                      >
                                        {comment.createdBy}
                                      </Link>
                                      : {comment.comment}
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
                  <div className="d-flex justify-content-center gap-3  mb-5 mw-100">
                    <button
                      style={{ textTransform: "none" }}
                      onClick={() => {
                        navigate(
                          `/collection/item/create/${id}/${item.createdBy}`
                        );
                      }}
                      className="btn btn-primary"
                    >
                      {t("item_create")}
                    </button>
                    <button
                      style={{ textTransform: "none" }}
                      type="button"
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                      className="btn btn-primary"
                    >
                      {t("item_delete")}
                    </button>
                    <button
                      style={{ textTransform: "none" }}
                      onClick={() =>
                        navigate(`/collection/item/edit/${item._id}`)
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
