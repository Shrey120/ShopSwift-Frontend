import React from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

export default function FeaturedProducts() {
  const { product, formatCurrency } = useAppContext();
  return (
    <>
      <div className="featured-box">
        <div className="featured-heading">
          <p>Check Now</p>
          <h1>Our Featured Products</h1>
        </div>
        <div className="main-product-box-featured">
          {product &&
            product.map((ele) => {
              if (ele.featured === true) {
                return (
                  <NavLink to={`/products/${ele.id}`}>
                    <div key={ele.id}>
                      <div className="single-product-box">
                        <div>
                          <img
                            className="img-box img-featured"
                            src={ele.image}
                            alt="Image"
                          />
                        </div>
                        <div className="name-price-box featured">
                          <div>{ele.name}</div>
                          <div className="currency">
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
