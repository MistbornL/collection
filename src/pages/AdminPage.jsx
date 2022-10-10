import React from "react";
import { Menu } from "../components/Menu";
import unblock from "../assets/block.png";
import trash from "../assets/trash.png";
import { useEffect, Fragment } from "react";

import { FetchUsers } from "../helper/FetchUsers";
import { HandleDelete } from "../helper/DeleteUsers";
import { handleBlock } from "../helper/BlockUser";
import { HandleUnblock } from "../helper/UnblockUser";

export const AdminPage = () => {
  const [users, setUsers] = React.useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  useEffect(() => {
    FetchUsers(token, setUsers);
  }, [token]);

  const handleChecked = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    if (name === "allSelect") {
      const updatedUsers = users.map((user) => {
        return {
          ...user,
          isChecked: isChecked,
        };
      });
      setUsers(updatedUsers);
    } else {
      const updatedUsers = users.map((user) => {
        if (user.username === name) {
          return { ...user, isChecked: isChecked };
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
    }
  };

  return (
    <>
      <header>
        <Menu />
      </header>
      <div
        className="App mt-5"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => handleBlock(users, token, email, setUsers)}
            type="button"
            className="btn btn-danger btn-lg"
          >
            Block
          </button>
          <img
            style={{ cursor: "pointer", width: "60px", height: "60px" }}
            src={unblock}
            onClick={() => HandleUnblock(users, token, email, setUsers)}
            alt="unblock"
          />
          <img
            onClick={() => HandleDelete(users, email, token, setUsers)}
            style={{ cursor: "pointer", width: "60px", height: "60px" }}
            src={trash}
            alt="delete"
          />
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
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Date Of Registration</th>
              <th scope="col"> Date of last authorization</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <Fragment key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name={user.username}
                    checked={user?.isChecked || false}
                    onChange={handleChecked}
                    id="flexCheckDefault"
                  />

                  <tr>
                    <th scope="row"></th>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.dateRegister}</td>
                    <td>{user.dateLastAuthorization}</td>
                    <td>{user.status}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
