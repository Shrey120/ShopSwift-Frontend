import React from "react";
import { FaCheck } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
export default function Colors({ colors }) {
  const { selectedColor, handleClick } = useAppContext();
  return (
    <div className="product-cart-color colors-category category-filters">
      <h2>Colors Available: </h2>
      <div>
        {colors &&
          colors.map((color, index) => {
            if (color === "ALL") {
              return (
                <button
                  key={index}
                  type="button"
                  value={color}
                  className="color-all"
                  onClick={(e) => handleClick(e)}>
                  ALL
                </button>
              );
            }
            return (
              <button
                className={
                  color === selectedColor
                    ? "product-colors active"
                    : "product-colors"
                }
                key={index}
                value={color}
                style={{ backgroundColor: color }}
                onClick={(e) => handleClick(e)}
                disabled={color === selectedColor ? true : false}>
                {selectedColor === color ? (
                  <FaCheck style={{ height: 10, color: "white" }} />
                ) : null}
              </button>
            );
          })}
      </div>
    </div>
  );
}
