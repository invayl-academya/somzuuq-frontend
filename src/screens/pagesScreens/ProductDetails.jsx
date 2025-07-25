import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addToCart, fetchCartItems } from "@/redux/cartSlice";
import { getProductDetails } from "@/redux/productSlice";
import { MoveLeft, StarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import CreateReview from "./components/CreateReview";
import { deleteReview, fetchReviews } from "@/redux/reviewSlice";
import { ErrorComponent, Loading } from "@/components/Loading";
import UpdateReview from "./components/UpdateReview";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  const {
    reviews,
    loading: loadingReview,
    error: errorReview,
  } = useSelector((state) => state.reviews);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  // console.log("product", product);
  // console.log(reviews);

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
    if (id) {
      dispatch(getProductDetails(id));
      dispatch(fetchReviews(id));
    }
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
    rating: productRating,
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
          <div className="flex items-center  space-x-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(productRating)
                    ? "fill-yellow-400"
                    : "fill-gray-300"
                }`}
              />
            ))}

            <span className="text-sm text-gray-600">{numReviews} reviews</span>
          </div>

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
      {/* // reviews  */}

      <div>
        <h2>Customer Reviews</h2>
        {loadingReview && <Loading />}
        {errorReview && <ErrorComponent error={errorReview} />}
        {reviews?.map((rev) => (
          <div key={rev._id} className="border-b py-3">
            <div className="flex justify-between">
              <p className="text-sm  text-gray-600">{rev?.user.name}</p>
              <p className="text-sm  text-gray-600">
                {new Date(rev?.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-1 my-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < rev.rating ? "fill-yellow-500" : "fill-gray-300"
                  }`}
                />
              ))}
            </div>
            <p>{rev?.comment}</p>

            {user && user._id === rev.user?._id && (
              <div className="flex space-x-2">
                <Button
                  className="bg-orange-700 text-gray-200"
                  onClick={() => {
                    if (confirm("are you sure u want delte this review")) {
                      dispatch(deleteReview(id))
                        .unwrap()
                        .then(() => {
                          toast.success("deleted Review ");
                          dispatch(fetchReviews(id));
                          dispatch(getProductDetails(id));
                        });
                    }
                  }}
                >
                  delete
                </Button>
                <Button
                  onClick={() => {
                    setSelectedReview(rev);
                    setIsUpdateOpen(true);
                  }}
                  variant="outline"
                  className="bg-orange-400"
                >
                  Edit Review
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <CreateReview productId={id} />

      <UpdateReview
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        productId={id}
        existingReview={selectedReview}
      />
    </div>
  );
};

export default ProductDetails;
