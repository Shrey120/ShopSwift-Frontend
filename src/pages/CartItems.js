import React from "react";
import { useAppContext } from "../context/AppContext";
import ManyItems from "../components/ManyItems";
import NoItems from "../components/NoItems";

export default function CartItems() {
  const { cartQuantity } = useAppContext();
  return (
    <div className="cart-page">
      {cartQuantity === 0 ? <NoItems /> : <ManyItems />}
    </div>
  );
}
