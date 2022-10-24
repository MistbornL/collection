import React, { useRef } from "react";

import "./popup.scss";

export const FieldPop = ({ setPop, setLabels, labels, handleAdd }) => {
  const field = useRef();
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
        <h1>title for your field </h1>
        <div className="d-flex gap-3">
          <input ref={field} type="text" />
          <button
            className="btn btn-primary"
            onClick={() => {
              setLabels([...labels, field.current.value]);
              handleAdd();
            }}
          >
            add
          </button>
        </div>
      </div>
    </div>
  );
};
