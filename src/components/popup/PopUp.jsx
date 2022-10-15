import React from "react";
import "./popup.scss";

export const Popup = ({ setPop, item }) => {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <button
          className="cross"
          onClick={() => {
            setPop(false);
          }}
        >
          X
        </button>
        <h1>List of People Who Likes This Post</h1>
        {item.likes.map((like, index) => {
          return (
            <div className="likes" key={index}>
              <p>{like}</p>
            </div>
          );
        })}

        <div className="wallet-btn"></div>
      </div>
    </div>
  );
};
