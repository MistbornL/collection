import React, { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { useTranslation } from "react-i18next";
import { DeleteCollection } from "../helper/DeleteCollection";
import { DeleteUser } from "../helper/DeleteUser";
import { FetchAccount } from "../helper/FetchAccount";
import { FetchCollection } from "../helper/FetchCollection";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [collections, setCollections] = useState([]);
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchCollection(email, setCollections);
    FetchAccount(email, token, setUser);
    if (collections.length >= 0) {
      setLoading(false);
    }
  }, [email, token, collections.length]);
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
        {loading ? (
          <div className="justify-content-center d-flex">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <section className="vh-100">
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-6 mb-3 mb-lg-0">
                  <div
                    className="card mb-10"
                    id="account"
                    style={{ borderRadius: ".5rem" }}
                  >
                    <div className="row g-0">
                      <div
                        className="col-md-4 gradient-custom text-center text-white"
                        style={{
                          borderTopLeftRadius: ".5rem",
                          borderBottomLeftRadius: ".5rem",
                        }}
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                          alt="Avatar"
                          className="img-fluid my-5"
                          style={{ width: "80px" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-4">
                          <h6>{t("item_information")}</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1">
                            <div className="col-6 mb-3">
                              <h6>{t("menu_email")}</h6>
                              <p className="text-muted">{user.email}</p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>{t("user_full_name")}</h6>
                              <p className="text-muted">
                                {user.firstName} {user.lastName}
                              </p>
                            </div>
                            <div className="col-6 mb-3">
                              <h6>{t("user_role")}</h6>
                              <p className="text-muted">{user.role}</p>
                            </div>
                          </div>
                          <h6>{t("menu_collections")}</h6>
                          <hr className="mt-0 mb-4" />
                          <div className="row pt-1 ">
                            {collections.map((collection) => {
                              return (
                                <div
                                  key={collection._id}
                                  className="raw-6 mb-4"
                                >
                                  <h6>
                                    {t("item_title")}: {collection.title}
                                  </h6>
                                  <h6 className="text-muted mb-5">
                                    {t("item_description")}:{" "}
                                    {collection.description}
                                  </h6>
                                  <div className="d-flex align-items-center text-align-center justify-content-center gap-3">
                                    <button
                                      style={{ textTransform: "none" }}
                                      onClick={() => {
                                        navigate(
                                          `/collection/items/${collection._id}/${user.email}`
                                        );
                                      }}
                                      className="btn btn-primary  "
                                    >
                                      {t("account_view_items")}
                                    </button>
                                    <button
                                      style={{ textTransform: "none" }}
                                      onClick={() => {
                                        navigate(
                                          `/collection/update/${collection._id}`
                                        );
                                      }}
                                      className="btn  btn-primary  "
                                    >
                                      {t("account_edit_collection")}
                                    </button>
                                    <button
                                      style={{ textTransform: "none" }}
                                      onClick={() =>
                                        DeleteCollection(
                                          collection._id,
                                          token,
                                          collections,
                                          navigate
                                        )
                                      }
                                      className="btn btn-primary "
                                    >
                                      {t("account_delete_collection")}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center gap-5 mb-5">
                        <button
                          style={{ textTransform: "none" }}
                          onClick={() => {
                            navigate(`/collection/create/${email}`);
                          }}
                          className="btn btn-primary"
                        >
                          {t("account_create_collection")}
                        </button>
                        <button
                          style={{ textTransform: "none" }}
                          onClick={() => DeleteUser(email, token)}
                          className="btn btn-primary"
                        >
                          {t("user_delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
