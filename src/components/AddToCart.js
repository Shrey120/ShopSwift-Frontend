import React from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
export default function AddToCart({ ele }) {
  const { addToCart, selectedColor, cartValue } = useAppContext();

  return (
    <>
      {selectedColor !== "ALL" ? (
        <NavLink
          to="/cart"
          onClick={() => addToCart(ele, selectedColor, cartValue)}>
          <button className="add-to-cart">Add To Cart</button>
        </NavLink>
      ) : null}
    </>
  );
}
