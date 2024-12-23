import React from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export default function FeaturedProducts() {
  const { product, formatCurrency } = useAppContext();
  return (
    <>
      <div className='featured-box'>
        <div className='featured-heading'>
          <p>Check Now</p>
          <h1>Our Featured Products</h1>
        </div>
        <div className='main-product-box-featured'>
          {product &&
            product.map((ele) => {
              if (ele.featured === true) {
                return (
                  <NavLink to={`/products/${ele._id}`}>
                    <div key={ele._id}>
                      <div className='single-product-box-featured'>
                        <div>
                          <img
                            alt='img'
                            className='img-featured'
                            src={ele.image[0].url}
                          />
                        </div>
                        <div className='name-price-box'>
                          <div>{ele.name.slice(0, 7)}..</div>
                          <div className='currency'>
                            {formatCurrency(ele.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              }
            })}
        </div>
      </div>
    </>
  );
}
