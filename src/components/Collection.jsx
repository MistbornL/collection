import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteCollection } from "../helper/DeleteCollection";
import { useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";

export const CollectionCard = ({
  collection,
  collections,
  token,
  email,
  email2,
  role,
  data,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div key={collection._id} className=" card-body mw-100">
      <h2 className="card-title">
        {t("item_creator")}: {collection.createdBy}
      </h2>
      <h2 className="card-title">
        {t("item_title")}: {collection.title}
      </h2>

      <p className="card-text">
        {t("item_description")}: {collection.description}
      </p>

      <p className="card-text">
        {t("item_Topic")}: {collection.topic}
      </p>
      <div className="d-flex justify-content-start gap-3">
        <button
          onClick={() => {
            navigate(`/collection/items/${collection._id}/${email}`);
          }}
          className="btn btn-primary"
        >
          {t("account_view_items")}
        </button>
        <button className="btn btn-primary">
          <CSVLink
            style={{ textDecoration: "none", color:"white" }}
            data={data.filter(
              (item) => item.createdBy === collection.createdBy
            )}
          >
            export csv
          </CSVLink>
        </button>
      </div>

      {role === "admin" || email2 === collection.createdBy ? (
        <div className="mt-3 d-flex gap-3 ">
          <button
            style={{ textTransform: "none" }}
            onClick={() => {
              navigate(`/collection/create/${collection.createdBy}`);
            }}
            className="btn btn-primary btn-sm "
          >
            {t("account_create_collection")}
          </button>
          <button
            style={{ textTransform: "none" }}
            onClick={() => {
              navigate(`/collection/update/${collection._id}`);
            }}
            className="btn btn-primary  btn-sm"
          >
            {t("account_edit_collection")}
          </button>

          <button
            style={{ textTransform: "none" }}
            onClick={() => DeleteCollection(collection._id, token, collections)}
            className="btn btn-primary  btn-sm"
          >
            {t("account_delete_collection")}
          </button>
        </div>
      ) : null}
    </div>
  );
};
