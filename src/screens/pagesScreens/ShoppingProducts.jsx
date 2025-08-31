import React from "react";
import BannerSlide from "./components/BannerSlide";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedProducts from "./components/FeaturedProducts";

const HomeScreen = () => {
  return (
    <>
      <div className="mt-0 pt-0 overflow-visible relative z-10">
        <BannerSlide />
      </div>
      {/* <BannerSlide /> */}
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
};

export default HomeScreen;
