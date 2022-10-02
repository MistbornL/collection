import React from "react";
import { Menu } from "../components/Menu";

export const Home = () => {
  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
        <div
          style={{ marginTop: "100px" }}
          className="d-flex justify-content-center "
        >
          <div className="card">
            <div style={{ padding: "32px" }} className="card-body">
              <h2 className="card-title">Home</h2>
              <img alt="img" />
              <p className="card-text">
                This is a simple hero unit, a simple jumbotron-style component
              </p>
              <button className="btn btn-primary">Learn more</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
