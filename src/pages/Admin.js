import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaShippingFast, FaCartPlus } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

import AdminDashboard from "../components/AdminDashboard";

function Admin() {
  const [d, setD] = useState(0);
  const changeD = () => {
    setD(1);
  };
  return (
    <>
      <div className="admin-main-page">
        <div className="admin-pages-list">
          <NavLink
            to="/admin/dashboard"
            className="admin-pages">
            <p className="admin-pages-icon">
              <MdDashboard />
            </p>
            &nbsp; Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            onClick={changeD}
            className="admin-pages">
            <p className="admin-pages-icon">
              <FaUsers />
            </p>
            &nbsp; Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            onClick={changeD}
            className="admin-pages">
            <p className="admin-pages-icon">
              <FaShippingFast />
            </p>
            &nbsp; Orders
          </NavLink>
          <NavLink
            to="/admin/products"
            onClick={changeD}
            className="admin-pages">
            <p className="admin-pages-icon">
              <MdInventory />
            </p>
            &nbsp; Inventory
          </NavLink>
          <NavLink
            to="/admin/new"
            onClick={changeD}
            className="admin-pages">
            <p className="admin-pages-icon">
              <FaCartPlus />
            </p>
            &nbsp; Add Product
          </NavLink>
        </div>
        <div>{d === 0 ? <AdminDashboard /> : <Outlet />}</div>
      </div>
    </>
  );
}

export default Admin;
