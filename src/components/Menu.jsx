import i18next from "i18next";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { HandleLogOut } from "../helper/UserLogOut";

export const Menu = () => {
  const token = localStorage.getItem("token");
  const search = useRef();
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  console.log(t("menu_collections"));

  return (
    <nav
      style={{ padding: "20xp" }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <a className="navbar-brand " href="/">
        {t("menu_collections")}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/collections">
              {t("menu_collections")}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={token ? "/account" : "/login"}>
              {t("menu_account")}
            </a>
          </li>
          <li className="nav-item">
            {token ? (
              <a
                style={{ cursor: "pointer" }}
                onClick={() => HandleLogOut(token)}
                className="nav-link"
              >
                {t("menu_logout")}
              </a>
            ) : (
              <a className="nav-link" href="/login">
                {t("menu_login")}
              </a>
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
            <a
              onClick={() => i18next.changeLanguage("geo")}
              className="nav-link"
            >
              GEO
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 d-flex">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            ref={search}
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success  my-2 my-sm-0"
            type="button"
            onClick={() =>
              (window.location.href = `/search/${search.current.value}`)
            }
          >
            {t("menu_search")}
          </button>
        </form>
      </div>
    </nav>
  );
};
