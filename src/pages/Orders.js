import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
export default function Orders() {
  const { orders, formatCurrency, fetchOrders } = useAppContext();
  useEffect(() => {
    fetchOrders();
  }, []);
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
              <NavLink to={`/products/${ele.id}`}>
                <div key={ele.id}>
                  <div className="list-single-product-box">
                    <div>
                      <img
                        className="list-img-box-order"
                        src={ele.image.url}
                        alt="Image"
                      />
                    </div>
                    <div className="name-price-description-box">
                      <h2 style={{ marginBottom: "10px" }}>
                        {ele.name}
                        <button
                          className="color-div"
                          style={{
                            backgroundColor: ele.color,
                          }}
                        />
                      </h2>

                      <div>{ele.description}</div>

                      <div>Quantity Ordered : {ele.quantity}</div>
                      <div className="currency">
                        Unit Item Price : {formatCurrency(ele.price)}
                      </div>
                      <div className="currency">
                        Total Price : {formatCurrency(ele.price * ele.quantity)}
                      </div>
                      <NavLink to={`/products/${ele.id}`}>
                        <button className="hireme-btn">Buy Again</button>
                      </NavLink>
                    </div>
                  </div>
                </div>
                <br />
                <hr />
                <br />
              </NavLink>
            );
          });
        })}
    </div>
  );
}
