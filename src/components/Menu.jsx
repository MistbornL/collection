import React, { useRef } from "react";
import { HandleLogOut } from "../helper/UserLogOut";

export const Menu = () => {
  const token = localStorage.getItem("token");
  const search = useRef();
  const role = localStorage.getItem("role");

  return (
    <nav
      style={{ padding: "20xp" }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <a className="navbar-brand " href="/">
        Collector
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
              Collections
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href={token ? "/account" : "/login"}>
              Account
            </a>
          </li>
          <li className="nav-item">
            {token ? (
              <a
                onClick={() => HandleLogOut(token)}
                className="nav-link"
                href="/"
              >
                Logout
              </a>
            ) : (
              <a className="nav-link" href="/login">
                Login
              </a>
            )}
          </li>

          {role === "admin" ? (
            <li className="nav-item">
              <a className="nav-link" href="/admin">
                admin
              </a>
            </li>
          ) : null}
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
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};
