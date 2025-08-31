import React, { useEffect, useState } from "react";
import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";
import slide4 from "../images/sale4.jpg";
import slide5 from "../images/slide11.webp";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/productSlice";
import { Link } from "react-router-dom";

const BannerSlide = () => {
  const slides = [
    { image: slide1, alt: "Summer Fashion Sale" },
    { image: slide2, alt: "New Arrivals" },
    { image: slide3, alt: "Limited Time Offers" },
    { image: slide4, alt: "Women's Accessories" },
    { image: slide5, alt: "Casual Wear Deals" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Group products into groups of 3 for current slide
  const productGroups = [];
  for (let i = 0; i < products.length; i += 3) {
    productGroups.push(products.slice(i, i + 3));
  }
  const currentProducts =
    productGroups[currentIndex % productGroups.length] || [];

  // Auto-advance slides
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  const gotoPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const gotoNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="relative w-full mb-32 lg:mb-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === Main Slider === */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl">
        {/* Slides with CSS transition */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/70 z-20" />

        {/* Content */}
        <div className="absolute inset-0 z-30 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white animate-slideIn">
              Big Summer Sale
            </h2>

            <p className="text-lg md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto animate-slideIn delay-100">
              Discover unbeatable deals on our curated selection of premium
              products
            </p>

            <div className="animate-slideIn delay-200">
              <Link to="/shop/products">
                <button className="group relative bg-gradient-to-r from-amber-400 to-pink-500 text-black font-semibold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Now
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={gotoPrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-40 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        <button
          onClick={gotoNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full z-40 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next"
        >
          <ChevronRight size={28} strokeWidth={2.5} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* === Floating Product Cards === */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 w-full max-w-7xl px-4 z-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product, i) => (
            <div
              key={product._id}
              className="h-full animate-cardIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link
                to={`/shop/product/${product?._id}`}
                className="block h-full bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-52 sm:h-60 overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < product.ratings ? "currentColor" : "none"}
                          className="mr-0.5"
                        />
                      ))}
                      <span className="text-gray-500 text-sm ml-1">
                        ({product.numOfReviews || 0})
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      ${product.price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Add these styles to your global CSS or style tag */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes cardIn {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.8s ease-out forwards;
        }
        .animate-slideIn.delay-100 {
          animation-delay: 0.1s;
        }
        .animate-slideIn.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-cardIn {
          animation: cardIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BannerSlide;
