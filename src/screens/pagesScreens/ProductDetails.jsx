import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addToCart, fetchCartItems } from "@/redux/cartSlice";
import { getProductDetails } from "@/redux/productSlice";
import { MoveLeft } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  // console.log("product", product);

  const handleAddToCart = () => {
    if (!user || !user._id) {
      toast.error("please Login to add Cart");
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
        toast.success("added to Cart");
        dispatch(fetchCartItems(user._id));
      })
      .catch(() => {
        toast.error("failed to add cart");
      });
  };

  useEffect(() => {
    if (id) dispatch(getProductDetails(id));
  }, [id, dispatch]);

  if (!product && isLoading) {
    return <Skeleton />;
  }

  const {
    image,
    title,
    brand,
    category,
    description,
    price,
    salePrice,
    rating,
    numReviews,
    countInStock,
  } = product;

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/shop/products"
        className="mt-2 py-3 flex items-center space-x-3"
      >
        <MoveLeft className="w-6 h-4 mr-3" /> Back to Products
      </Link>

      <div className="grid gir-cols-1 md:grid-cols-2 gap-10 bg-slate-100">
        <div>
          <img
            className="w-full h-[400px] object-cover rounded-lg border"
            src={image}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>

          <div className="flex items-center text-sm text-gray-600 gap-4">
            <span>
              brand : <strong className="capitalize">{brand}</strong>
            </span>
            <span>
              category : <strong className="capitalize">{category}</strong>
            </span>
          </div>
          {/* / review container  */}
          <div>reviews</div>

          {salePrice > 0 ? (
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-red-600 line-through">
                $ {salePrice}
              </span>
              <span className="text-2xl font-bold text-gray-600">
                $ {price}
              </span>
              <Badge className="bg-red-600 text-slate-100">Sale</Badge>
            </div>
          ) : (
            <span> ${price}</span>
          )}

          <div>
            <span
              className={`inline-block px-3 py-1 text-sm  rounded-full ${
                countInStock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-900"
              }`}
            >
              {countInStock > 0 ? "In Stock " : "Out of Stock"}
            </span>
          </div>

          <p className="text-sm text-gray-600 text-base leading-relaxed">
            {description}
          </p>

          <Button
            disabled={countInStock === 0}
            className="mt-2 mb-2 bg-[#C562AF]"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
