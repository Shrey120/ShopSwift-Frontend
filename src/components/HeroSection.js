import React from "react";
export default function HeroSection() {
  return (
    <>
      <div className="header">
        <div className="text-home">
          <h5>Welcome to </h5>
          <h1>Shopswift</h1>
          <p>
            Discover a world of convenience and style right at your fingertips.
            At Shopswift, we believe in making your shopping experience as
            delightful as finding that perfect item.
          </p>
        </div>
        <div>
          <img
            className="main-img"
            src="pic/MainPhoto.jpg"
          />
        </div>
      </div>
    </>
  );
}
