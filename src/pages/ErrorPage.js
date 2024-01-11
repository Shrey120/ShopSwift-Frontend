import React from "react";
import { NavLink } from "react-router-dom";
export default function ErrorPage() {
  return (
    <>
      <div className="error-404">
        <h1>404</h1>
        <h3>UH OH! You're lost.</h3>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>

        <NavLink
          className="hireme-btn"
          to="/">
          Go Back to Home
        </NavLink>
      </div>
    </>
  );
}
