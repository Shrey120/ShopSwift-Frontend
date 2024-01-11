import React from "react";

import { FaTruck } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
export default function Services() {
  return (
    <>
      <div className="about-us-box">
        <div className="box-1">
          <FaTruck className="icon-styling" />
          <div className="box-text"> Super Fast and Free Delievery</div>
        </div>
        <div className="box-2-3">
          <div className="box-2">
            <MdOutlineSecurity className="icon-styling" />
            Non-contact Shipping
          </div>
          <div className="box-3">
            <TbTruckReturn className="icon-styling" />
            Super Fast Return Policy
          </div>
        </div>
        <div className="box-4">
          <RiSecurePaymentLine className="icon-styling" />
          Super Secure Payment System
        </div>
      </div>
    </>
  );
}
