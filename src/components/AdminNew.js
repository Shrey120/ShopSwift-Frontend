import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

function AdminNew() {
  const { loading, addProduct } = useAppContext();

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
      <div>
        <h1 className="pages-heading">Add Product Details</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProduct(body);
        }}>
        <div className="update-page-grid ">
          <div className="card__content product-update">
            <div className="line-display">
              <div>
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
              </div>
              <div>
                <label htmlFor="company">Company</label>
                <input
                  value={body.company}
                  onChange={(e) => changeHandler(e)}
                  required
                  type="text"
                  name="company"
                  id="company"
                />
              </div>
            </div>

            <div className="line-display">
              <div>
                <label htmlFor="price">Price</label>
                <input
                  value={body.price}
                  onChange={(e) => changeHandler(e)}
                  required
                  type="number"
                  name="price"
                  id="price"
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  value={body.category}
                  onChange={(e) => changeHandler(e)}
                  required
                  type="text"
                  name="category"
                  id="category"
                />
              </div>
            </div>
            <div className="line-display">
              <div>
                <label htmlFor="stock">Stock</label>
                <input
                  value={body.stock}
                  onChange={(e) => changeHandler(e)}
                  required
                  type="number"
                  name="stock"
                  id="stock"
                />
              </div>
              <div>
                <label htmlFor="stock">Featured</label>
                <input
                  value={body.featured}
                  onChange={(e) => changeHandler(e)}
                  required
                  type="boolean"
                  name="featured"
                  id="featured"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                className="product-desc"
                value={body.description}
                onChange={(e) => changeHandler(e)}
                required
                type="text"
                name="description"
                minLength="10"
                id="description"
              />
            </div>
          </div>
          <div className="card__content product-update">
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
              className="width hireme-btn"
              type="button"
              onClick={addColor}>
              Add Color
            </button>
          </div>
        </div>
        <button
          disabled={loading}
          className="hireme-btn"
          id="btn"
          type="submit">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AdminNew;
