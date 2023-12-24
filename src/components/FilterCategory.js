import React from "react";
import { useAppContext } from "../context/AppContext";
import Colors from "./Colors";
export default function FilterCategory() {
  const {
    selectedCompany,
    searchItem,
    getUniqueData,
    handleCategoryChange,
    handleCompanyChange,
    handleSearchChange,
    formatCurrency,
    handlePriceChange,
    buttonClicked,
    selectedPrice,
    showProducts,
    maxPrice,
    minPrice,
  } = useAppContext();

  const categoryData = getUniqueData("category");
  const companyData = getUniqueData("company");
  const colorData = getUniqueData("colors");

  return (
    <div>
      <input
        class="search-field"
        placeholder="Search"
        value={searchItem}
        onChange={(event) => handleSearchChange(event)}
      />
      <div className="category-filters">
        <h2>Category:</h2>
        {categoryData &&
          categoryData.map((cur, index) => {
            return (
              <button
                className={`cat-btn ${
                  buttonClicked === cur ? "btn-active" : ""
                }`}
                key={index}
                value={cur}
                onClick={(e) => handleCategoryChange(e)}>
                {cur}
              </button>
            );
          })}
      </div>
      <div className="category-filters">
        <h2>Companies:</h2>
        <select
          className="comp-btn"
          value={selectedCompany}
          onChange={(e) => handleCompanyChange(e)}>
          {companyData &&
            companyData.map((cur, index) => {
              return (
                <option
                  className="comp-btn"
                  key={index}
                  value={cur}>
                  {cur}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <Colors colors={colorData} />
      </div>
      <div className="category-filters">
        <h2>Price </h2>
        {/* <div className="input-num">
          <div>
            Minimum
            <input
              type="number"
              value={minPrice}
              onChange={(e) => minPriceChange(e)}
            />
          </div>
          <div>
            Maximum
            <input
              type="number"
              value={selectedPrice}
              onChange={(e) => handlePriceChange(e)}
            />
          </div>
        </div> */}

        <p class="currency">{formatCurrency(selectedPrice)}</p>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          val={selectedPrice}
          onChange={(e) => handlePriceChange(e)}
        />
      </div>
      <button
        className="hireme-btn"
        onClick={showProducts}>
        Clear Filters
      </button>
    </div>
  );
}
