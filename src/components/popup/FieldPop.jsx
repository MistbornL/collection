import React, { useRef } from "react";
import { CustomInput } from "../CustomInput";
import "./popup.scss";

export const FieldPop = ({ setPop, setFields, fields }) => {
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
        <input ref={field} type="text" />
        <button
          onClick={() =>
            setFields([
              ...fields,
              <CustomInput placeholder={field} type="text" ref={null} />,
            ])
          }
        >
          add
        </button>
      </div>
    </div>
  );
};
