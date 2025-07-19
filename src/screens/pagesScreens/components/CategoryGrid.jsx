import {
  ActivitySquareIcon,
  BabyIcon,
  BookIcon,
  CloudLightningIcon,
  Footprints,
  GemIcon,
  Icon,
  LaptopIcon,
  ShirtIcon,
  ShoppingBagIcon,
  StarIcon,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const categories = [
  {
    id: "electronics",
    label: "Electronics",
    icon: LaptopIcon,
    bgColor: "bg-gradient-to-br from-indigo-500 to-purple-500 text-white",
  },
  {
    id: "kids",
    label: "Kids",
    icon: BabyIcon,
    bgColor: "bg-gradient-to-br from-pink-400 to-yellow-300 text-white",
  },
  {
    id: "women",
    label: "Women",
    icon: CloudLightningIcon,
    bgColor: "bg-gradient-to-br from-rose-400 to-fuchsia-500 text-white",
  },
  {
    id: "men",
    label: "Men",
    icon: ShirtIcon,
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500 text-white",
  },

  {
    id: "footwear",
    label: "footwear",
    icon: Footprints,
    bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
  },
  {
    id: "books",
    label: "Books",
    icon: BookIcon,
    bgColor: "bg-gradient-to-br from-yellow-400 to-orange-500 text-white",
  },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: ActivitySquareIcon }, // sporty
  { id: "adidas", label: "Adidas", icon: StarIcon }, // performance
  { id: "puma", label: "Puma", icon: ShoppingBagIcon }, // casual/sportwear
  { id: "h&m", label: "H&M", icon: ShirtIcon }, // fashion
  { id: "ymc", label: "Invayl", icon: BabyIcon }, // assuming youthful/educational brand
  { id: "gucci", label: "Gucci", icon: GemIcon }, // luxury
];
const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleNavigateProducts = (itemId, section) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [itemId.id],
    };

    // console.log(itemId, section);

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    // ADD FILTER TO QUERY SRING
    const queryString = `${section}=${encodeURIComponent(itemId.id)}`;
    console.log("query", queryString);
    navigate(`/shop/products?${queryString}`);
  };
  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Shop By Category</h2>
        <p className="mt-3 text-lg text-gray-500">
          Discover our most popular products by category
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category) => {
          const { id, label, icon: Icon, bgColor } = category;
          return (
            <div
              key={id}
              onClick={() => handleNavigateProducts(category, "category")}
              className="group rounded-xl flex flex-col items-center justify-center p-4 bg-white shadow hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-full mb-3 ${bgColor}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-md font-semibold text-gray-800">{label}</h3>
              <span className="text-sm mt-1 text-indigo-600 opacity-0 group-hover:opacity-100 transition">
                Shop Now →
              </span>
            </div>
          );
        })}
      </div>

      {/* Brand Section */}
      <div className="mt-20">
        <h3 className="text-2xl font-semibold text-center text-gray-900 mb-6">
          Popular Brands
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {brandWithIcon.map((brand) => {
            const { id, label, icon: Icon } = brand;
            return (
              <div
                key={id}
                onClick={() => handleNavigateProducts(brand, "brand")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-indigo-100 text-sm font-medium text-gray-700 transition duration-300"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
