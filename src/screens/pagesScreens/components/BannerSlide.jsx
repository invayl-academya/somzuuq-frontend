import React, { useEffect, useState } from "react";
import slide1 from "../images/slide1.jpg";
import slide2 from "../images/slide2.jpg";
import slide3 from "../images/slide3.jpg";
import slide4 from "../images/sale4.jpg";
import slide5 from "../images/slide11.webp";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BannerSlide = () => {
  const slides = [slide1, slide2, slide3, slide4, slide5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const gotoPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const gotoNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-xl">
      {/* Slide Images */}
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide}
          alt={`Slide ${i + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* Gradient Overlay + CTA (optional) */}
      <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
        <div className="text-center text-white px-4 md:px-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Big Summer Sale
          </h2>
          <p className="text-lg md:text-xl mb-6 drop-shadow-md">
            Explore the best offers on your favorite items
          </p>
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={gotoPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full z-30 shadow-md transition"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={gotoNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 rounded-full z-30 shadow-md transition"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            } transition cursor-pointer`}
            onClick={() => setCurrentIndex(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerSlide;
