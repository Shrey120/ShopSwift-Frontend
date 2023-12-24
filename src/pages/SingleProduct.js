import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import ProductImage from "../components/ProductImage";
import ReactStars from "react-rating-stars-component";
import AddToCart from "../components/AddToCart";

import Colors from "../components/Colors";

function SingleProduct() {
  const { id } = useParams();
  const {
    singleProduct,
    showSingleProduct,
    formatCurrency,
    cartValueToZero,
    increament,
    decreament,
    cartValue,
    showProducts,
  } = useAppContext();

  useEffect(() => {
    showSingleProduct(id);
    cartValueToZero();
    showProducts();
  }, []);
  return (
    <>
      {singleProduct &&
        singleProduct.map((ele) => {
          if (ele.id === id) {
            return (
              <div
                key={ele.id}
                className="product-page">
                <div className="product-images">
                  <ProductImage image={ele.image} />
                </div>
                <div className="product-details">
                  <div className="product-name">
                    <h1>{ele.name}</h1>
                  </div>
                  <div className="product-rating">
                    <p>{ele.stars}</p>
                    <ReactStars
                      edit={false}
                      color="gray"
                      activeColor="tomato"
                      value={ele.stars}
                      isHalf={true}
                    />
                    <h4>({ele.reviews} Customer Reviews)</h4>
                  </div>
                  <div className="product-mrp-cost">
                    <h3 class="currency">
                      MRP: {formatCurrency(ele.price + 25000)}
                    </h3>
                    <h4 class="currency">
                      Deal of the day: {formatCurrency(ele.price)}
                    </h4>
                  </div>
                  <div className="product-description">{ele.description}</div>
                  <div className="product-brand">
                    <h3>Brand : </h3>
                    <p>{ele.company}</p>
                  </div>
                  <div className="product-stock">
                    <h3>Availibility :</h3>
                    {ele.stock > 5 ? (
                      <p>In Stock</p>
                    ) : (
                      <p className="alrt">
                        Hurry only <strong>{ele.stock}</strong> left
                      </p>
                    )}
                  </div>
                  <hr />
                  <div>
                    <Colors colors={ele.colors} />
                    <div className="product-cart-component">
                      <div className="product-cart">
                        <button
                          onClick={() => increament(ele.stock)}
                          className="btn-order">
                          +
                        </button>
                        <input
                          className="btn-input"
                          placeholder={cartValue}
                        />
                        <button
                          onClick={() => decreament()}
                          className="btn-order">
                          -
                        </button>
                      </div>
                      <AddToCart ele={ele} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
}

export default SingleProduct;
