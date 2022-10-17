import React from "react";
import { useTranslation } from "react-i18next";
import { DeleteCollection } from "../helper/DeleteCollection";
import { useNavigate } from "react-router-dom";

export const CollectionCard = ({
  collection,
  collections,
  index,
  token,
  email,
  email2,
  role,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div key={index} style={{ padding: "32px" }} className="card-body  ">
      <h2 className="card-title">
        {t("item_creator")}: {collection.createdBy}
      </h2>
      <h2 className="card-title">
        {t("item_title")}: {collection.title}
      </h2>

      <p className="card-text">
        {t("item_description")}: {collection.description}
      </p>
      <h2 className="card-title">
        {t("item_tags")}: {collection.tags}
      </h2>
      <button
        onClick={() => {
          navigate(`/collection/items/${collection._id}/${email}`);
        }}
        className="btn btn-primary"
      >
        {t("account_view_items")}
      </button>
      {role === "admin" || email2 === collection.createdBy ? (
        <div s className="mt-3 d-flex gap-3 ">
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
