import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getProductDetails } from "@/redux/productSlice";
import { createReview, fetchReviews } from "@/redux/reviewSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const CreateReview = ({ productId }) => {
  //   console.log(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleSubmitReview = () => {
    if (!user) {
      toast.error("please Login first ");
      return;
    }
    if (rating === 0 || comment.trim() === "") {
      toast.error("please fill the rating / Comment");
      return;
    }

    dispatch(createReview({ productId, review: { rating, comment } }))
      .unwrap()
      .then(() => {
        toast.success("Review Submitted");
        dispatch(fetchReviews(productId));
        dispatch(getProductDetails(productId));
        setRating(0);
        setComment("");
      })
      .catch((err) => {
        toast.error(err, "Review failed");
      });
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold ">Write A Review</h3>

      <div className="my-2">
        <Label className="block mb-1">Rating</Label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border rounded p-2 w-full"
        >
          <option> Select ...</option>
          {[1, 2, 3, 4, 5].map((val) => (
            <option key={val} value={val}>
              {val} -{" "}
              {["Poor", "Fair", "Good", "Very Good", "Excellent"][val - 1]}
            </option>
          ))}
        </select>
      </div>

      <div className="py-2">
        <label className="block mb-1">Comment</label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <Button onClick={handleSubmitReview}>Submit Review</Button>
    </div>
  );
};

export default CreateReview;
