import React from "react";
import BannerSlide from "./components/BannerSlide";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedProducts from "./components/FeaturedProducts";

const HomeScreen = () => {
  return (
    <>
      <BannerSlide />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
};

export default HomeScreen;
