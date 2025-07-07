import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addToCart, fetchCartItems } from "@/redux/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
  return (
    <Card className="w-full max-w-sm mx-auto shadow-sm">
      <div className="relative">
        <Link to={`/shop/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-60 object-cover rounded-t-sm"
          />
        </Link>
        {product?.salePrice > 0 && (
          <Badge className="absolute top-2 left-3 bg-orange-600 text-slate-100">
            Sale
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-2">
        <Link to={`/shop/product/${product._id}`}>
          <h2 className="text-base font-semibold text-gray-800  line-clamp-2">
            {product.title}
          </h2>
        </Link>

        <div className="flex justify-between text-sm text-gray-600 ">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        <div>
          {product?.salePrice > 0 ? (
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold text-red-500 line-through">
                $ {product.salePrice}
              </span>
              <span className="text-lg font-semibold text-gray-500">
                $ {product.price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-gray-500">
              {" "}
              ${product.price}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={product?.countInStock === 0}
          className="w-full"
          onClick={handleAddToCart}
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
