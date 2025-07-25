import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getProductDetails } from "@/redux/productSlice";
import { fetchReviews, updateReview } from "@/redux/reviewSlice";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UpdateReview = ({ isOpen, onClose, productId, existingReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
    }
  }, [existingReview]);

  const hndleUpdateReview = () => {
    if (rating === 0 || comment.trim() === "") {
      toast.error("please fill the rating / Comment");
      return;
    }

    dispatch(updateReview({ productId, review: { rating, comment } }))
      .unwrap()
      .then(() => {
        toast.success("Review Updated");
        dispatch(fetchReviews(productId));
        dispatch(getProductDetails(productId));
        onClose();
        setRating(0);
        setComment("");
      })
      .catch((err) => {
        toast.error(err, "Review failed");
      });
  };

  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex justify-center  items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md  p-6 relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-100 bg-slate-400"
          variant="outline"
        >
          &times;
        </Button>
        <h2 className="text-lg font-bold mb-4">update Review</h2>

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
        <div className="flex items-center gap-2">
          <Button
            onClick={onClose}
            className="bg-slate-300 text-gry-500 hover:text-slate-100"
          >
            Cancel
          </Button>
          <Button
            onClick={hndleUpdateReview}
            className="bg-green-500 "
            variant="outline"
          >
            Update Review
          </Button>
        </div>
      </div>
    </div>,
    document.body // 👈 this is the required second argument
  );
};

export default UpdateReview;
