import React from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import SortingProducts from "./SortingProducts";

export default function PageView() {
  const { product, activeStyle, changeActiveViewStyle } = useAppContext();
  return (
    <>
      <div className="options">
        <div className="view-style">
          <button
            className={
              activeStyle
                ? "view-style-button view-style-active"
                : "view-style-button"
            }
            onClick={() => changeActiveViewStyle(true)}>
            <BsGrid3X3GapFill className="grid-style" />
          </button>
          <button
            className={
              activeStyle
                ? "view-style-button"
                : "view-style-button view-style-active"
            }
            onClick={() => changeActiveViewStyle(false)}>
            <FaThList className="list-style" />
          </button>
        </div>
        <div>{product && `${product.length} Products Available`}</div>
        <div>
          <SortingProducts />
        </div>
      </div>
    </>
  );
}
