import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

function AdminUpdateProduct() {
  const { user, showAlert, baseUrl, loading, updateProductHandler } =
    useAppContext();

  const [body, setBody] = useState({
    name: "",
    company: "",
    price: 0,
    colors: [],
    description: "",
    category: "",
    featured: false,
    stock: 0,
    reviews: 0,
    stars: 0,
    image: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
  });
  const params = useParams();
  const singleProductUrl = baseUrl + "admin/products/";
  const getSingleProductData = async () => {
    try {
      const response = await fetch(`${singleProductUrl}${params.id}`, {
        method: "GET",
        headers: {
          Authorization: user.token,
        },
      });
      const data = await response.json();

      setBody(data.data);
    } catch (error) {
      showAlert(error);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  // Changing fields
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBody({
      ...body,
      [name]: value,
    });
  };
  // image change
  const imageChangeHandler = (value, index) => {
    const updatedImage = [...body.image];
    updatedImage[index] = {
      url: value,
    };
    setBody({
      ...body,
      image: updatedImage,
    });
  };
  // color change
  const handleColorChange = (index, value) => {
    const updatedColors = [...body.colors];
    updatedColors[index] = value;
    setBody((prevBody) => ({
      ...prevBody,
      colors: updatedColors,
    }));
  };

  const addColor = () => {
    setBody((prevBody) => ({
      ...prevBody,
      colors: [...prevBody.colors, ""],
    }));
  };

  return (
    <div className="update-page">
      <div className="card__content">
        <h3>Update Product</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProductHandler(params.id, body);
          }}>
          <label htmlFor="name">Name</label>
          <input
            value={body.name}
            onChange={(e) => changeHandler(e)}
            required
            type="text"
            name="name"
            minLength="1"
            id="name"
          />
          <label htmlFor="company">Company</label>
          <input
            value={body.company}
            onChange={(e) => changeHandler(e)}
            required
            type="text"
            name="company"
            id="company"
          />
          <label htmlFor="price">Price</label>
          <input
            value={body.price}
            onChange={(e) => changeHandler(e)}
            required
            type="number"
            name="price"
            id="price"
          />
          <label htmlFor="category">Category</label>
          <input
            value={body.category}
            onChange={(e) => changeHandler(e)}
            required
            type="text"
            name="category"
            id="category"
          />
          <label htmlFor="description">Description</label>
          <input
            value={body.description}
            onChange={(e) => changeHandler(e)}
            required
            type="text"
            name="description"
            minLength="10"
            id="description"
          />
          <label htmlFor="stock">Stock</label>
          <input
            value={body.stock}
            onChange={(e) => changeHandler(e)}
            required
            type="number"
            name="stock"
            id="stock"
          />
          <label htmlFor="images">Images Url</label>
          <input
            value={body.image[0].url}
            onChange={(e) => imageChangeHandler(e.target.value, 0)}
            required
            type="text"
            name="url"
            id="images"
          />
          <input
            value={body.image[1].url}
            onChange={(e) => imageChangeHandler(e.target.value, 1)}
            required
            type="text"
            name="images"
            id="images"
          />
          <input
            value={body.image[2].url}
            onChange={(e) => imageChangeHandler(e.target.value, 2)}
            required
            type="text"
            name="images"
            id="images"
          />
          <input
            value={body.image[3].url}
            onChange={(e) => imageChangeHandler(e.target.value, 3)}
            required
            type="text"
            name="images"
            id="images"
          />
          <label htmlFor="colors">Colors</label>
          {body.colors.map((color, index) => (
            <div key={index}>
              <input
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                required
                type="text"
                name={`color${index}`}
                id={`color${index}`}
              />
            </div>
          ))}
          <button
            className="hireme-btn"
            type="button"
            onClick={addColor}>
            Add Color
          </button>
          <button
            disabled={loading}
            className="btn hireme-btn"
            id="btn"
            type="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateProduct;
