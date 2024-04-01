import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

function AdminUpdate() {
  const { user, showAlert, baseUrl, loading, updateHandler } = useAppContext();

  const [body, setBody] = useState({
    name: "",
    email: "",
  });

  const params = useParams();

  const singleUserUrl = baseUrl + "admin/users/";
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`${singleUserUrl}${params.id}`, {
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
    getSingleUserData();
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

  return (
    <div className="update-page">
      <div className="card__content">
        <h3>Update User</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateHandler(params.id, body);
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
          <label htmlFor="email">Email</label>
          <input
            value={body.email}
            onChange={(e) => changeHandler(e)}
            required
            type="email"
            name="email"
            id="email"
          />
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

export default AdminUpdate;
