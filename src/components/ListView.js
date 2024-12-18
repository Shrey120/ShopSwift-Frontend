import React from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export default function ListView() {
  const { filteredItems, formatCurrency } = useAppContext();

  return (
    <>
      <div className='list-main-product-box '>
        {filteredItems &&
          filteredItems.map((ele) => {
            return (
              <NavLink to={`/products/${ele._id}`}>
                <div key={ele._id}>
                  <div className='list-single-product-box'>
                    <div>
                      <img
                        className='list-img-box'
                        src={ele.image[0].url}
                        alt='Image'
                      />
                    </div>
                    <div className='name-price-description-box'>
                      <div>{ele.name}</div>
                      <div className='currency'>
                        {formatCurrency(ele.price * 100)}
                      </div>
                      <div>{ele.description.slice(0, 150)} ....</div>
                      <NavLink to={`/products/${ele._id}`}>
                        <button className='hireme-btn'>Read More</button>
                      </NavLink>
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
