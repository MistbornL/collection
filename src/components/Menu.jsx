import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { HandleLogOut } from "../helper/UserLogOut";
import i18n from "../i18n";
import { LanguageHandler } from "../pages/UserLanguage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Menu = () => {
  const token = localStorage.getItem("token");
  const search = useRef();
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  const email = localStorage.getItem("email");
  const language = localStorage.getItem("language");
  const navigate = useNavigate();

  useEffect(() => {
    if (language === "geo") {
      i18n.changeLanguage("geo");
    } else {
      i18n.changeLanguage("en");
    }
  }, [language]);
  return (
    <nav
      style={{ padding: "20xp" }}
      className="navbar navbar-expand-md navbar-dark bg-dark"
      role="navigation"
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <Link className="navbar-brand " to={"/"}>
        {t("menu_collector")}
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="#navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="#navbarCollapse"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/collections"}>
              {t("menu_collections")}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={token ? "/account" : "/login"}>
              {t("menu_account")}
            </Link>
          </li>
          <li className="nav-item">
            {token ? (
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => HandleLogOut(token, navigate)}
                className="nav-link"
              >
                {t("menu_logout")}
              </Link>
            ) : (
              <Link className="nav-link" to={"/login"}>
                {t("menu_login")}
              </Link>
            )}
          </li>

          {role === "admin" ? (
            <li className="nav-item">
              <a className="nav-link" href="/admin">
                {t("menu_admin")}
              </a>
            </li>
          ) : null}
          <li className="nav-item">
            {token && language === "geo" ? (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  LanguageHandler(token, "en", email);
                }}
                className="nav-link"
              >
                En
              </a>
            ) : token && language === "en" ? (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  LanguageHandler(token, "geo", email);
                }}
                className="nav-link"
              >
                Geo
              </a>
            ) : i18n.language === "geo" ? (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
                className="nav-link"
              >
                En
              </a>
            ) : (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  i18n.changeLanguage("geo");
                }}
                className="nav-link"
              >
                Geo
              </a>
            )}
          </li>
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/collections/search/${search.current.value}`);
          }}
          className="form-inline my-2 my-lg-0 d-flex"
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder={t("menu_search")}
            ref={search}
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success  my-2 my-sm-0"
            type="submit"
          >
            {t("menu_search")}
          </button>
        </form>
      </div>
    </nav>
  );
};
