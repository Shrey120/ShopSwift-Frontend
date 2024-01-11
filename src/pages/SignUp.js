import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { userSetter, signup, loading } = useAppContext();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setEmail(userData.email);
      setPassword(userData.password);
      setRememberMe(true);
    }
    userSetter();
  }, []); // This empty dependency array ensures the effect runs only once

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem(
        "rememberedUser",
        JSON.stringify({ email, password })
      );
    } else {
      localStorage.removeItem("rememberedUser");
    }
  }, [rememberMe, email, password]);

  return (
    <div className="card">
      <div className="card__content">
        <h3>Create Account</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup(name, email, password);
          }}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            name="name"
            minLength="1"
            id="name"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
            type="password"
            name="password"
            id="password"
          />
          <div className="rmb">
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              <p className="text">Remember me</p>
            </label>
          </div>

          <button
            disabled={loading}
            className="btn hireme-btn"
            id="btn"
            type="submit">
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <p className="formfooter">
            Already have an account? <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
