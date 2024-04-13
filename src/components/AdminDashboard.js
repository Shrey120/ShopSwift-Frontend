import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FaCartFlatbed } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi2";
import { GiBeachBag } from "react-icons/gi";

import ReactStars from "react-rating-stars-component";

function AdminDashboard() {
  const {
    showData,
    showProducts,
    product,
    allUsers,
    allOrders,
    getOrders,
    formatCurrency,
    orders,
  } = useAppContext();

  console.log(orders);
  useEffect(() => {
    getOrders();
    showData();
    showProducts();
  }, []);

  const [sum, setSum] = useState(0);
  console.log(product);
  useEffect(() => {
    const orderSum = () => {
      let totalSum = 0;
      allOrders &&
        allOrders.forEach((ele) => {
          ele.cartItems.forEach((curr) => {
            totalSum = totalSum + curr.price * curr.quantity;
          });
        });
      setSum(totalSum);
    };

    orderSum();
  }, [allOrders]);

  return (
    <>
      <div className="dashboard-flex">
        <div className="dash dash-users">
          <div className="dash-flex">
            <h2>Total Users</h2>
            <h1>
              <FaUsersViewfinder className="dash-icon" />
            </h1>
          </div>
          <div className="dash-num">
            <h1>{allUsers.length}</h1>
            <p>2.0% (30 days)</p>
            <img
              alt="Image"
              className="dash-img"
              style={{
                color: "orange",
                height: "100px",
                width: "120%",
                backgroundColor: "transparent",
              }}
              src="https://www.pngall.com/wp-content/uploads/10/Line-Chart-Vector-No-Background.png"
            />
          </div>
        </div>
        <div className="dash dash-products">
          <div className="dash-flex">
            <h2>Total Products</h2>
            <h1>
              <FaCartFlatbed className="dash-icon" />
            </h1>
          </div>

          <div className="dash-num">
            {" "}
            <h1>{product.length}</h1>
            <p>1.00% (45 days)</p>
            <img
              alt="Image"
              style={{
                color: "orange",
                height: "90px",
                width: "100%",
                marginTop: "10px",
                backgroundColor: "transparent",
              }}
              src=" https://www.pngall.com/wp-content/uploads/10/Line-Chart-PNG.png"
            />
          </div>
        </div>
        <div className="dash dash-orders">
          <div className="dash-flex">
            <h2>Total Orders</h2>
            <h1>
              <GiBeachBag className="dash-icon" />
            </h1>
          </div>
          <div className="dash-num">
            <h1>{allOrders.length}</h1>
            <p>10.0% (20 days)</p>

            <img
              alt="Image"
              style={{
                color: "orange",
                height: "100px",
                width: "100%",
                backgroundColor: "transparent",
              }}
              src="https://www.pngall.com/wp-content/uploads/10/Line-Chart-Vector-PNG-Cutout.png"
            />
          </div>
        </div>
        <div className="dash dash-sales">
          <div className="dash-flex">
            <h2>All sales</h2>
            <h1>
              <HiCurrencyDollar className="dash-icon" />
            </h1>
          </div>
          <div className="dash-num">
            <h1 className="currency">{formatCurrency(sum)}</h1>
            <p>20.00% (40 days)</p>
            <img
              alt="Image"
              style={{
                color: "orange",
                height: "100px",
                width: "100%",
                marginTop: "10px",
                backgroundColor: "transparent",
              }}
              src="https://www.pngall.com/wp-content/uploads/10/Line-Chart-PNG-Free-Image.png"
            />
          </div>
        </div>
      </div>

      <div className="dashboard-flex">
        <div className="dash-stats">
          <h1>Latest Orders</h1>
          <hr />
          <div>
            {allOrders &&
              allOrders.map((curElem) => {
                return curElem.cartItems.map((ele) => {
                  return (
                    <div key={ele.id}>
                      <br />
                      <div className="list-single-product-box">
                        <div>
                          <img
                            className="list-img-dash"
                            src={ele.image.url}
                            alt="Image"
                          />
                        </div>
                        <div className="name-price-description-box">
                          <div className="away">
                            <div>{ele.name}</div>
                            <div className="currency">
                              {formatCurrency(ele.price)}
                            </div>
                          </div>
                          <div className="away">
                            <div>Quantity Ordered : {ele.quantity}</div>
                            <div className="currency">
                              Total Price :{" "}
                              {formatCurrency(ele.price * ele.quantity)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <hr />
                    </div>
                  );
                });
              })}
          </div>
        </div>
        <div className="dash-stats">
          <h1>Products Added Recently</h1>
          <hr />
          <div>
            {product &&
              product.map((ele) => {
                return (
                  <div key={ele.id}>
                    <br />
                    <div className="list-single-product-box">
                      <div>
                        <img
                          className="list-img-dash"
                          src={ele.image[0].url}
                          alt="Image"
                        />
                      </div>
                      <div className="name-price-description-box">
                        <div className="away">
                          <div style={{ display: "flex" }}>
                            {ele.name} &nbsp;
                            <ReactStars
                              edit={false}
                              color="gray"
                              activeColor="tomato"
                              value={ele.stars}
                              isHalf={true}
                            />
                            &nbsp;
                            <div>({ele.reviews})</div>
                          </div>
                          <div className="currency">
                            {formatCurrency(ele.price)}
                          </div>
                        </div>
                        <div className="away">
                          <div>Company : {ele.company}</div>
                          <div>{ele.category}</div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
