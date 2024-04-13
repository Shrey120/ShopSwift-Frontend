import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { MdDelete, MdUpdate } from "react-icons/md";
import { Link } from "react-router-dom";
function AdminUsers() {
  const { showData, allUsers, deleteUserHandler } = useAppContext();
  useEffect(() => {
    showData();
  }, []);
  return (
    <>
      <div>
        <h1 className="admin-pages-heading">All Users</h1>
      </div>
      <div className="scrollable">
        <div>
          <table className="user-data">
            <thead>
              <tr>
                <th class="bold">Name</th>
                <th class="bold">Email</th>
                <th class="bold">Update</th>
                <th class="bold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers &&
                allUsers.map((ele) => {
                  return (
                    <tr key={ele._id}>
                      <td className="style-admin">{ele.name}</td>
                      <td className="style-admin">{ele.email}</td>
                      <td className="style-admin">
                        <Link to={`updateUser/${ele._id}`}>
                          <button className="admin-btn update">
                            <MdUpdate />
                          </button>
                        </Link>
                      </td>
                      <td className="style-admin">
                        <button
                          onClick={() => deleteUserHandler(ele._id)}
                          class="admin-btn delete">
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
