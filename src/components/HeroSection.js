import React from "react";
export default function HeroSection() {
  return (
    <>
      <div className='header'>
        <div className='text-home'>
          <div className='font-head'>Welcome to </div>
          <div className='font-head'>Shopswift</div>
          <p>
            Discover a world of convenience and style right at your fingertips.
            At Shopswift, we believe in making your shopping experience as
            delightful as finding that perfect item.
          </p>
        </div>
        <div>
          <img
            alt='main'
            className='main-img'
            src='pic/MainPhoto.jpg'
          />
        </div>
      </div>
    </>
  );
}
