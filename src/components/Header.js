import React, { useContext } from "react";
import { useAppContext } from "../context/AppContext";
import "../style.css";

import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
export default function Header() {
  const { user, cartQuantity, showProducts, fetchOrders } = useAppContext();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <nav className="header-main">
        <div
          className="website-name"
          onClick={() => handleClick()}>
          <p class="first">Shop</p>
          <p class="second">Swift</p>
        </div>
        <div className="header-pages">
          <NavLink
            to="/"
            className="page">
            Home
          </NavLink>
          <NavLink
            to="/products"
            onClick={showProducts}
            className="page">
            Products
          </NavLink>
          <NavLink
            to="/about"
            className="page">
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="page">
            Contact
          </NavLink>
          <NavLink
            to="/orders"
            onClick={fetchOrders}
            className="page">
            Orders
          </NavLink>
          <NavLink
            to="/cart"
            className="icon">
            <div className="cart-total-items">{cartQuantity}</div>
            <FiShoppingBag />
          </NavLink>
          {user ? (
            <NavLink
              to="/userdetails"
              className="page login">
              <FaUser className="login-icon" />
              {user.name.slice(0, 5)}..
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className="page login">
              <FaUser className="login-icon" />
              Login
            </NavLink>
          )}
        </div>
        {/* <div className="mobile-navbar">
          <FiMenu className="responsive--btn" />
          <RxCross2 className="responsive--btn responsive-cross-btn" />
        </div> */}
      </nav>
    </>
  );
}
