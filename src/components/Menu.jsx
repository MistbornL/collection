import React from "react";

export const Menu = () => {
  return (
    <nav
      style={{ padding: "20xp" }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
    >
      <a className="navbar-brand" href="/">
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
            <a className="nav-link" href="/account">
              Account
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Account
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                localStorage.clear();
              }}
              className="nav-link"
              href="/"
            >
              Logout
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 d-flex">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};
