import React from "react";
import { BsFillCartXFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
export default function NoItems() {
  return (
    <div className="cart-empty">
      <h1 className="ce-elem">Your ShopSwift cart is empty</h1>
      <h3 className="ce-elem">
        <BsFillCartXFill className="facartplus" />
      </h3>
      <NavLink
        className="ce-elem"
        to="/products">
        <button className="hireme-btn">Shop More To Add Items</button>
      </NavLink>
    </div>
  );
}
