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
  const search = useRef();
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
  const email = localStorage.getItem("email");
  const language = localStorage.getItem("language");
  const navigate = useNavigate();

  useEffect(() => {
    if (language === "geo") {
      i18n.changeLanguage("geo");
    } else if (language === "en") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("pl");
    }
  }, [language]);
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
          <li className="nav-item active">
            <a role="button" className="nav-link" href="/collections">
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
                role="button"
                href="/#"
                style={{ cursor: "pointer" }}
                onClick={() => HandleLogOut(token, navigate)}
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
          {/* admin page */}
          {role === "admin" ? (
            <li className="nav-item">
              <a className="nav-link" href="/admin">
                {t("menu_admin")}
              </a>
            </li>
          ) : null}

          {/* language */}
          <li class="nav-item dropdown">
            <a
              href="/#"
              role="button"
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {t("menu_language")}
            </a>
            <div class="dropdown-menu">
              <a
                onClick={() =>
                  token
                    ? LanguageHandler(token, "en", email)
                    : i18n.changeLanguage("en")
                }
                href="/#"
                role="button"
                class="dropdown-item"
              >
                English
              </a>
              <a
                onClick={() =>
                  token
                    ? LanguageHandler(token, "geo", email)
                    : i18n.changeLanguage("geo")
                }
                href="/#"
                role="button"
                class="dropdown-item"
              >
                Georgian
              </a>
              <a
                onClick={() =>
                  token
                    ? LanguageHandler(token, "pl", email)
                    : i18n.changeLanguage("pl")
                }
                href="/#"
                role="button"
                class="dropdown-item"
              >
                Polish
              </a>
            </div>
          </li>
          {/* <li className="nav-item">
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
          </li> */}
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
