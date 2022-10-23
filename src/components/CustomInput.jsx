import React, { Fragment } from "react";

export const CustomInput = ({ placeholder, type, ref }) => {
  return (
    <Fragment>
      <h4 className="card-title">{placeholder}</h4>
      <div className="form-group">
        <input
          ref={ref}
          type={type}
          className="form-control"
          placeholder={placeholder}
        />
      </div>
    </Fragment>
  );
};
