import React from "react";
import { useAppContext } from "../context/AppContext";

export default function SortingProducts() {
  const { handleSortChange } = useAppContext();

  return (
    <div>
      <select
        className="drop-down-list"
        onClick={(e) => handleSortChange(e)}>
        <option value="a-z">Name(a-z)</option>
        <option value="z-a">Name(z-a)</option>
        <option value="l-h">Price (low-high)</option>
        <option value="h-l">Price (high-low)</option>
      </select>
    </div>
  );
}
