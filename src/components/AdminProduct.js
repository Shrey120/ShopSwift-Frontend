import React, { useEffect } from "react";

import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { MdDelete, MdUpdate } from "react-icons/md";
function AdminProduct() {
  const { showProducts, product, formatCurrency, deleteProductHandler } =
    useAppContext();
  useEffect(() => {
    showProducts();
  }, []);
  return (
    <>
      <div>
        <h1 className="admin-pages-heading">All Products</h1>
      </div>
      <div className="scrollable">
        <table className="user-data">
          <thead>
            <tr>
              <th class="bold">Name</th>
              <th class="bold">Image</th>
              <th class="bold">Company</th>
              <th class="bold">Price</th>
              <th class="bold">Category</th>
              <th class="bold">Update</th>
              <th class="bold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {product &&
              product.map((ele) => {
                return (
                  <tr key={ele._id}>
                    <td className="style-admin">{ele.name}</td>
                    <td className="style-admin">
                      <img
                        class="admin-cart-image "
                        src={ele.image[0].url}
                        alt="Image Missing"
                      />
                    </td>
                    <td className="style-admin">{ele.company}</td>
                    <td className="style-admin">{formatCurrency(ele.price)}</td>
                    <td className="style-admin">{ele.category}</td>

                    <td className="style-admin">
                      <Link to={`update/${ele._id}`}>
                        <button className="admin-btn update">
                          <MdUpdate />
                        </button>
                      </Link>
                    </td>
                    <td className="style-admin">
                      <button
                        onClick={() => deleteProductHandler(ele.id)}
                        class="admin-btn delete">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      );
    </>
  );
}

export default AdminProduct;
