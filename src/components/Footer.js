import React from "react";
import { NavLink } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <section className="contact-short">
        <div className="footer-1">
          <div>
            <h3>Ready to get started?</h3>
            <h3>Talk to us today</h3>
          </div>

          <NavLink
            className="hireme-btn"
            to="/contact">
            Get Started
          </NavLink>
        </div>
      </section>

      <footer>
        <div className="footer-mid">
          <div>
            <h3>Shop Swift</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </p>
          </div>
          <div>
            <h3>Subscribe to get important updates</h3>
            <form
              className="footer-form-subscribe"
              action="#">
              <input
                type="email"
                name="email"
                placeholder="YOUR E-MAIL"
              />

              <input
                type="submit"
                value="Subscribe"
                className="footer-submit-btn"
              />
            </form>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className="footer-social--icons">
              <div>
                <a
                  href="https://www.discord.com"
                  target="_blank">
                  <FaDiscord className="icons" />
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com"
                  target="_blank">
                  <FaInstagram className="icons" />
                </a>
              </div>
              <div>
                <a
                  href="https://www.youtube.com"
                  target="_blank">
                  <FaYoutube className="icons" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-contact">
            <h3>Call Us</h3>
            <p>+91 12345678978</p>
          </div>
        </div>

        <div>
          <hr />
          <div className="footer-bottom--section">
            <p class="company-rights">
              @{new Date().getFullYear()} SwopSwift. All Rights Reserved
            </p>
            <div>
              <p>PRIVACY POLICY</p>
              <p>TERMS & CONDITIONS</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
