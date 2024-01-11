import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import { useAppContext } from "../context/AppContext";

function Home() {
  const { showProducts } = useAppContext();
  useEffect(() => {
    showProducts();
  }, []);
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  );
}

export default Home;
