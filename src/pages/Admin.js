import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaShippingFast, FaCartArrowDown } from "react-icons/fa";

function Admin() {
  return (
    <>
      <div className="admin-main-page">
        <div className="admin-pages-list">
          <NavLink
            to="/admin/users"
            className="admin-pages">
            <p className="admin-pages-icon">
              <FaUsers />
            </p>
            &nbsp; Users
          </NavLink>
          <NavLink
            to="/admin/services"
            className="admin-pages">
            <p className="admin-pages-icon">
              <FaShippingFast />
            </p>
            &nbsp; Orders
          </NavLink>
          <NavLink
            to="/admin/products"
            className="admin-pages">
            <p className="admin-pages-icon">
              <FaCartArrowDown />
            </p>
            &nbsp; Products
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Admin;
