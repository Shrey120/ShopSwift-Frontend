import React from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export default function GridView() {
  const { filteredItems, formatCurrency } = useAppContext();
  return (
    <>
      <div className='main-product-box '>
        {filteredItems &&
          filteredItems.map((ele) => {
            return (
              <NavLink to={`/products/${ele._id}`}>
                <div key={ele._id}>
                  <div className='single-product-box'>
                    <div>
                      <img
                        className='img-box'
                        src={ele.image[0].url}
                        alt='Image'
                      />
                    </div>
                    <div className='name-price-box'>
                      <div>{ele.name.slice(0, 20)} ....</div>
                      <div className='currency'>
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
