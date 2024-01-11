import React from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export default function GridView() {
  const { filteredItems, formatCurrency } = useAppContext();
  return (
    <>
      <div className="main-product-box ">
        {filteredItems &&
          filteredItems.map((ele) => {
            return (
              <NavLink to={`/products/${ele.id}`}>
                <div key={ele.id}>
                  <div className="single-product-box">
                    <div>
                      <img
                        className="img-box"
                        src={ele.image}
                        alt="Image"
                      />
                    </div>
                    <div className="name-price-box">
                      <div>{ele.name}</div>
                      <div className="currency">
                        {formatCurrency(ele.price)}
                      </div>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div>
    </>
  );
}
