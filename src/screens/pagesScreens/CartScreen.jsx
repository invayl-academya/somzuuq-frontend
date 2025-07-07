import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { fetchCartItems } from "@/redux/cartSlice";
import { TrashIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartScreen = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems(user._id));
    }
  }, [user]);

  const items = cartItems?.items || [];
  const total = items.reduce((sum, item) => {
    const price = item.salePrice > 0 ? item.salePrice : item.price;
    return sum + price * item.qty;
  }, 0);
  return (
    <SheetContent className="sm:max-w-md flex flex-col z-50">
      <SheetHeader>
        <SheetTitle>My Cart</SheetTitle>
      </SheetHeader>

      <div>
        {items.length === 0 ? (
          <p>Your cart is Empty</p>
        ) : (
          items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 border-b pb-3 items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md border"
              />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-700 line-clamp-1">
                  {item.title}
                </h4>

                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" className="h-6 w-6 p-0">
                    {" "}
                    -
                  </Button>
                  <span>{item.qty}</span>
                  <Button variant="outline" className="h-6 w-6 p-0">
                    +
                  </Button>
                </div>

                <div className="flex items-center justify-between mr-3">
                  <p className="text-sm text-gray-500">
                    $ {item.price} * {item.qty}
                  </p>
                  <Button variant="outline" className="w-6 h-6 bg-orange-600 ">
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-md font-semibold text-gray-800">
          <span className="uppercase">Total</span>
          <span className="mr-3"> $ {total}</span>
        </div>

        <Button className="w-full mt-4 bg-green-500 text-white">
          CheckOut
        </Button>
      </div>
    </SheetContent>
  );
};

export default CartScreen;
