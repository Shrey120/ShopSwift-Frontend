import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { MdEdit } from "react-icons/md";

function AdminOrders() {
  const {
    getOrders,
    allOrders,
    formatCurrency,
    updateOrderStatus,
    bgColor,
    orderSum,
  } = useAppContext();
  const [editableId, setEditableId] = useState("");

  const handleStatusChange = async (e, order, id) => {
    const orderStatus = { ...order, status: e.target.value };
    const updateSuccess = await updateOrderStatus(orderStatus, id);
    if (updateSuccess) {
      getOrders(); // Fetch orders only if the status update was successful
      setEditableId(""); // Reset editableId after updating status
    }
  };

  const changeOrderStatus = (id) => {
    setEditableId(id);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div>
        <h1 className="admin-pages-heading">All Orders</h1>
      </div>
      <div className="scrollable">
        <div>
          <table className="user-data">
            <thead>
              <tr>
                <th className="bold">Name</th>
                <th className="bold">User ID</th>
                <th className="bold">Email</th>
                <th className="bold">Date</th>
                <th className="bold">Location</th>
                <th className="bold">Product</th>
                <th className="bold">Price</th>
                <th className="bold">Quantity</th>
                <th className="bold">Color</th>
                <th className="bold">Status</th>
                <th className="bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders &&
                allOrders.map((ele) =>
                  ele.cartItems.map((curItem) => (
                    <tr key={curItem._id}>
                      <td className="style-admin">{ele.userName}</td>
                      <td className="style-admin">{ele.user}</td>
                      <td className="style-admin">{ele.userEmail}</td>
                      <td className="style-admin">{ele.date}</td>
                      <td className="style-admin">{ele.city}</td>
                      <td className="style-admin">{curItem.name}</td>
                      <td className="style-admin">
                        {formatCurrency(curItem.price)}
                      </td>
                      <td className="style-admin">{curItem.quantity}</td>
                      <td className="style-admin">
                        <button
                          className="product-colors"
                          style={{ backgroundColor: curItem.color }}
                        />
                      </td>
                      <td className="style-admin">
                        {editableId === ele._id ? (
                          <select
                            id="status"
                            value={ele.status}
                            onChange={(e) => {
                              handleStatusChange(e, ele, ele._id);
                            }}>
                            <option value="Ordered">Ordered</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Accepted">Accepted</option>
                          </select>
                        ) : (
                          <span
                            className="value"
                            style={bgColor(ele.status)}>
                            {ele.status}
                          </span>
                        )}
                      </td>
                      <td className="style-admin">
                        <button
                          className="edit-btn"
                          onClick={() => {
                            changeOrderStatus(ele._id);
                          }}>
                          <MdEdit />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminOrders;
