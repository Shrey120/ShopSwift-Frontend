import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
function Contact() {
  const { contact } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const contactData = await contact(name, query, email);
    setName("");
    setEmail("");
    setQuery("");
  };

  return (
    <>
      <h2 className="common-heading">Contact page</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.459043685758!2d76.8012561!3d30.705492999999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fece98c02452b%3A0xf3c99c507c9226eb!2sElante%20Mall%2C%20178-178A%2C%20Purv%20Marg%2C%20Industrial%20Area%20Phase%20I%2C%20Chandigarh%2C%20160002!5e0!3m2!1sen!2sin!4v1701314134451!5m2!1sen!2sin"
        width="100%"
        height="600"
        title="Map"
        style={{ border: 0 }}
        allowFullscreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form">
          <h1 className="query-heading">Fill in Your Queries</h1>
          <form
            onSubmit={handleLogin}
            className="contact-inputs">
            <input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="query-box"
              type="text"
              placeholder="Username"
              name="username"
              required="true"
              autoComplete="off"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="query-box"
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required="true"
            />

            <input
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              rows="10"
              className="query-box-1"
              name="Message"
              required="true"
              autoComplete="off"
              placeholder="Enter you message"
            />

            <input
              className="query-box-send"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
