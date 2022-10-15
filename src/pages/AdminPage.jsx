import React from "react";
import { Menu } from "../components/Menu";
import unblock from "../assets/block.png";
import trash from "../assets/trash.png";
import { useEffect, Fragment } from "react";

import { FetchUsers } from "../helper/FetchUsers";
import { HandleDelete } from "../helper/DeleteUsers";
import { handleBlock } from "../helper/BlockUser";
import { HandleUnblock } from "../helper/UnblockUser";
import { HandleChangeRole } from "../helper/ChangeRole";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
  const [users, setUsers] = React.useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    FetchUsers(token, setUsers);
  }, [token, email]);

  const handleChecked = (e) => {
    const email = e.target.name;

    const isChecked = e.target.checked;
    if (email === "allSelect") {
      const updatedUsers = users.map((user) => {
        return {
          ...user,
          isChecked: isChecked,
        };
      });
      setUsers(updatedUsers);
    } else {
      const updatedUsers = users.map((user) => {
        if (user.email === email) {
          return { ...user, isChecked: isChecked };
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <div
        className="App mt-5"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => handleBlock(users, token, email, setUsers, navigate)}
            type="button"
            className="btn btn-danger btn-lg"
          >
            {t("user_block")}
          </button>
          <img
            style={{ cursor: "pointer", width: "60px", height: "60px" }}
            src={unblock}
            onClick={() => HandleUnblock(users, token, setUsers)}
            alt="unblock"
          />
          <img
            onClick={() =>
              HandleDelete(users, email, token, setUsers, navigate)
            }
            style={{ cursor: "pointer", width: "60px", height: "60px" }}
            src={trash}
            alt="delete"
          />
          <button
            onClick={() =>
              HandleChangeRole(users, token, setUsers, email, navigate)
            }
            type="button"
            className="btn btn-primary btn-lg"
          >
            {t("user_change_role")}
          </button>
        </div>
        <table className="table ">
          <thead>
            <tr>
              <input
                className="form-check-input"
                type="checkbox"
                name="allSelect"
                checked={
                  users.filter((user) => user?.isChecked !== true).length < 1
                }
                onChange={handleChecked}
                id="flexCheckDefault"
              />

              <th scope="col">ID</th>
              <th scope="col"> {t("menu_name")}</th>
              <th scope="col"> {t("menu_email")}</th>
              <th scope="col"> {t("user_date_registered")}</th>
              <th scope="col"> {t("user_last_login")}</th>
              <th scope="col"> {t("user_status")}</th>
              <th scope="col"> {t("user_role")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <Fragment key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={user.email}
                    checked={user?.isChecked || false}
                    onChange={handleChecked}
                    id="flexCheckDefault"
                  />

                  <tr>
                    <th scope="row"></th>
                    <td>{user.id}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.dateRegister}</td>
                    <td>{user.dateLastAuthorization}</td>
                    <td>{user.status}</td>
                    <td>{user.role}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
