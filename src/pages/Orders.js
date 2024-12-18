import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { TbShoppingCartCancel } from "react-icons/tb";
export default function Orders() {
  const { orders, formatCurrency, fetchOrders, bgColor, cancelOrder } =
    useAppContext();
  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}>
        Ordered Items
      </h1>
      {orders &&
        orders.map((curElem) => {
          return curElem.cartItems.map((ele) => {
            return (
              <div key={ele.id}>
                <div className='list-single-product-box'>
                  <div>
                    <img
                      className='list-img-box-order'
                      src={ele.image.url}
                      alt='Image'
                    />
                  </div>
                  <div className='name-price-description-box'>
                    <div className='away-1'>
                      <h2 style={{ marginBottom: "10px" }}>
                        {ele.name}
                        <button
                          className='color-div'
                          style={{
                            backgroundColor: ele.color,
                          }}
                        />
                      </h2>
                      <div>
                        <span
                          className='value'
                          style={bgColor(curElem.status)}>
                          {curElem.status}
                        </span>
                      </div>
                    </div>

                    <div>{ele.description.slice(0, 300)} ... </div>

                    <div>Quantity Ordered : {ele.quantity}</div>
                    <div className='currency'>
                      Unit Item Price : {formatCurrency(ele.price)}
                    </div>
                    <div className='currency'>
                      Total Price : {formatCurrency(ele.price * ele.quantity)}
                    </div>
                    <div className='away-1'>
                      <NavLink to={`/products/${ele.id.slice(0, 25)}`}>
                        <button
                          style={{ marginTop: "20px" }}
                          className='cancel-order'>
                          Buy Again
                        </button>
                      </NavLink>
                      <button
                        style={{ marginTop: "20px" }}
                        className='cancel-order'
                        onClick={() => cancelOrder(ele.id)}>
                        <TbShoppingCartCancel className='cancel-order-btn' />
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <hr />
                <br />
              </div>
            );
          });
        })}
    </div>
  );
}
