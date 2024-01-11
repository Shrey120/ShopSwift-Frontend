import React from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
export default function UserDetails() {
  const { user } = useAppContext();

  return (
    <div>
      <div classname="userbox">
        <div className="userdetails">
          <h1 style={{ marginBottom: "10px" }}>
            <u>User Details</u>
          </h1>
          <h3 className="line">
            Name : <p>{user.name}</p>
          </h3>
          <h3 className="line">
            Email : <p>{user.userData.email}</p>
          </h3>
          <Link
            to="/signup"
            className="hireme-btn lout">
            LogOut
          </Link>
        </div>
      </div>
    </div>
  );
}
