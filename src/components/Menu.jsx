import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { HandleLogOut } from "../helper/UserLogOut";
import i18n from "../i18n";
import { LanguageHandler } from "../helper/UserLanguage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DarkMode from "./darkmode/ToggleDark";
import menu from "../assets/menu.png";

export const Menu = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  const language = localStorage.getItem("language");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useRef();

  useEffect(() => {
    if (token) {
      if (language === "geo") {
        i18n.changeLanguage("geo");
      } else if (language === "en") {
        i18n.changeLanguage("en");
      } else {
        i18n.changeLanguage("pl");
      }
    }
  }, [language, token]);
  return (
    <nav
      style={{ padding: "10px" }}
      className="navbar navbar-collapse navbar-expand-lg navbar-dark "
      role="navigation"
    >
      <Link style={{ marginTop: "-10px" }} className="navbar-brand " to={"/"}>
        {t("menu_collector")}
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <img style={{ width: "40px", height: "40px" }} src={menu} alt="menu" />
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="navmenu"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href={token ? "/account" : "/login"}>
              {t("menu_account")}
            </a>
          </li>

          {/* admin page */}
          {role === "admin" ? (
            <li className="nav-item">
              <a className="nav-link" href="/admin">
                {t("menu_admin")}
              </a>
            </li>
          ) : null}

          {/* language */}
          <li className="nav-item dropdown">
            <a
              href=""
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {t("menu_language")}
            </a>
            <div className="dropdown-menu">
              <a
                onClick={() =>
                  token
                    ? LanguageHandler(token, "en", email)
                    : i18n.changeLanguage("en")
                }
                className="dropdown-item"
              >
                English
              </a>
              <a
                onClick={() =>
                  token
                    ? LanguageHandler(token, "geo", email)
                    : i18n.changeLanguage("geo")
                }
                className="dropdown-item"
              >
                Georgian
              </a>
              <a
                onClick={() =>
                  token
                    ? LanguageHandler(token, "pl", email)
                    : i18n.changeLanguage("pl")
                }
                className="dropdown-item"
              >
                Polish
              </a>
            </div>
          </li>

          {/* login */}
          <li className="nav-item">
            {token ? (
              <a
                href=""
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  HandleLogOut(token, navigate);
                }}
                className="nav-link"
              >
                {t("menu_logout")}
              </a>
            ) : (
              <a role="button" className="nav-link" href="/login">
                {t("menu_login")}
              </a>
            )}
          </li>
          {/* darkmode */}
          <li className="nav-item">
            <DarkMode />
          </li>
        </ul>
        <form
          onSubmit={(e) => {
            if (search.current.value) {
              e.preventDefault();
              navigate(`/search/${search.current.value}`);
            } else {
              e.preventDefault();
            }
          }}
          className="form-inline my-2 my-lg-0 d-flex justify-content-end gap-3"
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder={t("menu_search")}
            ref={search}
            aria-label="Search"
            style={{
              border: "1px solid #2D4662",
              borderRadius: "10px",
              background: "rgb(17 34 42)",
              color: "#9999a3",
            }}
          />
          <button
            style={{
              background: "rgba(64, 117, 255, 0.3)",
              border: "1px solid #4075FF",
              boxShadow: "0px 4px 34px 4px rgba(64, 117, 255, 0.3)",
              borderRadius: "10px",
            }}
            className="btn btn-outline  my-2 my-sm-0"
            type="submit"
          >
            {t("menu_search")}
          </button>
        </form>
      </div>
    </nav>
  );
};
