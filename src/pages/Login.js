import React, {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const { login, loading } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);
      if (rememberMe) {
        localStorage.setItem(
          "rememberedUser",
          JSON.stringify({ email, password })
        );
      } else {
        localStorage.removeItem("rememberedUser");
      }
    } catch (error) {
      console.log("trouble in remembering the password");
    }
    setEmail("");
    setPassword("");
    setRememberMe("");
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const userData = JSON.parse(rememberedUser);
      setEmail(userData.email);
      setPassword(userData.password);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="card">
      <div className="card__content">
        <h3>Login to your account</h3>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter Name"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
            type="email"
            name="email"
            id="email"
          />

          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter Email"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
            type="password"
            name="password"
            id="password"
          />

          <div
            className="rem"
            style={{ marginBottom: "4rem" }}>
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

          <input
            disabled={loading}
            className="btn hireme-btn"
            id="btn"
            type="submit"
            value={loading ? "Loading..." : "Login"}
          />

          <p className="formfooter">
            New to MyApp? <Link to="/signup">Sign Up</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
