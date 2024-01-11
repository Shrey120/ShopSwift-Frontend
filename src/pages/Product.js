import React, { useEffect } from "react";

import { useAppContext } from "../context/AppContext";
import GridView from "../components/GridView";
import FilterCategory from "../components/FilterCategory";
import PageView from "../components/PageView";
import ListView from "../components/ListView";

function Product() {
  const { showProducts, activeStyle } = useAppContext();

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <>
      <div className="product-main-page">
        <div className="bottom-margin">
          <FilterCategory />
        </div>
        <div className="products">
          <div className="bottom-margin">
            <PageView />
          </div>
          {activeStyle ? <GridView /> : <ListView />}
        </div>
      </div>
    </>
  );
}

export default Product;
