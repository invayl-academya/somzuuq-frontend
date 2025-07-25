import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "@/redux/productSlice";
import { addToCart, fetchCartItems } from "@/redux/cartSlice";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  const { listProducts, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchFilteredProducts({
        filteredParms: {},
        sortParams: "price-asc",
      })
    );
  }, [dispatch]);

  const addToCartHandler = (product) => {
    if (!user?._id) {
      toast.error("Please login to add items to cart");
      return;
    }

    dispatch(
      addToCart({
        userId: user._id,
        productId: product._id,
        qty: 1,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Added to cart!");
        dispatch(fetchCartItems(user._id));
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">🔥 Best Sellers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {listProducts?.slice(0, 12)?.map((product) => (
          <div
            key={product._id}
            className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 duration-300"
          >
            <Link to={`/shop/product/${product._id}`}>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                {product.salePrice > 0 && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Mega Offer
                  </div>
                )}
              </div>
            </Link>

            <div className="p-4 space-y-1">
              <h3 className="text-sm font-semibold line-clamp-2">
                {product.title}
              </h3>

              <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={
                      i < Math.floor(product.rating || 0) ? "#FACC15" : "none"
                    }
                    strokeWidth={1}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  {product.salePrice > 0 ? (
                    <>
                      <span className="text-red-600 font-bold">
                        ${product.price}
                      </span>
                      <span className="line-through text-gray-400 text-sm">
                        ${product.salePrice}
                      </span>
                    </>
                  ) : (
                    <span className="text-primary font-bold">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Cart Icon Button */}
                <Button
                  onClick={() => addToCartHandler(product)}
                  className="text-gray-100 bg-slate-400 hover:text-black transition"
                >
                  <ShoppingCartIcon size={22} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
