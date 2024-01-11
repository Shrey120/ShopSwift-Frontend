import React from "react";

import { useAppContext } from "../context/AppContext";

import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
export default function ManyItems() {
  const {
    cartItems,
    formatCurrency,
    increamentOnCart,
    decreamentOnCart,
    deleteItem,
    cartPrice,
    clearCart,
    onCheckOut,
  } = useAppContext();

  let shippingFee = 7000;
  return (
    <>
      {" "}
      <div className="cart-heading-grid-five-column head">
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        <p>Remove</p>
      </div>
      <hr />
      <div className="cart-item">
        {cartItems &&
          cartItems.map((curElem) => {
            return (
              <div
                className="cart-heading-grid-five-column "
                key={curElem.id}>
                <div className="cart-image--name">
                  <div>
                    <figure>
                      <img
                        class="cart-image"
                        src={curElem.image.url}
                        alt="Image Missing"
                      />
                    </figure>
                  </div>
                  <div className="name-color">
                    <p>{curElem.name}</p>
                    <p>
                      color:
                      <button
                        className="color-div"
                        style={{
                          backgroundColor: curElem.color,
                        }}
                      />
                    </p>
                  </div>
                </div>
                {/* price   */}
                <div className="cart-item-property price-c">
                  <p class="currency">{formatCurrency(curElem.price)}</p>
                </div>

                {/* Quantity  */}
                <div className="cart-item-property quant-c">
                  <button
                    onClick={() => increamentOnCart(curElem.stock, curElem.id)}
                    className="card-quantity-add-sub">
                    +
                  </button>
                  <input
                    className="card-quantity-amount"
                    placeholder={curElem.quantity}
                  />
                  <button
                    onClick={() => decreamentOnCart(curElem.id)}
                    className="card-quantity-add-sub">
                    -
                  </button>
                </div>

                {/* //Subtotal */}
                <div className="cart-item-property total-c">
                  <p class="currency">
                    {formatCurrency(curElem.price * curElem.quantity)}
                  </p>
                </div>

                {/* //Delete Products */}
                <div>
                  <FaTrash
                    onClick={() => deleteItem(curElem.id)}
                    className="remove-icon"
                  />
                </div>

                {/* order total_amount */}
              </div>
            );
          })}
      </div>
      <hr />
      <div className="cart-button">
        <NavLink to="/products">
          <button className="hireme-btn cart-btn"> continue Shopping </button>
        </NavLink>
        <button
          className="hireme-btn cart-btn"
          onClick={clearCart}>
          clear cart
        </button>
      </div>
      <div className="order-total--amount">
        <div className="order-total--subdata">
          <div>
            <p>subtotal:</p>
            <p class="currency bold">{formatCurrency(cartPrice)}</p>
          </div>
          <div>
            <p>shipping fee:</p>
            <p class="currency bold">{formatCurrency(shippingFee)}</p>
          </div>
          <hr />
          <div>
            <p>order total:</p>
            <p class="currency bold">
              {formatCurrency(shippingFee + cartPrice)}
            </p>
          </div>
          <button
            className="hireme-btn"
            onClick={onCheckOut}>
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
