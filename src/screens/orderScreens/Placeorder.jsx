import { Button } from "@/components/ui/button";
import { fetchCartItems } from "@/redux/cartSlice";
import { createOrder } from "@/redux/orderSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Placeorder = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems, status } = cart;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCartItems(user._id));
    }
  }, [user]);

  const items = cartItems?.items || [];

  const itemsPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  console.log(items);
  //   console.log("shipp", shippingAddress );
  const handlePlaceOrder = async () => {
    const orderData = {
      orderItems: items?.map((item) => ({
        productId: item.productId,
        qty: item.qty,
        title: item.title,
        image: item.image,
        price: item.price,
      })),

      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      toast.success("Order created");
      navigate(`/shop/order/${result.createdOrder._id}`);
    } catch (err) {
      toast.err(err || "failed to create");
    }
  };

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-whie">
        <div className="w-12 h-12 border-3 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* // items  */}
        <div className="lg:col-span-2">
          <h2>Order Items</h2>
          {items?.length === 0 ? (
            <p>Your cart is Empty </p>
          ) : (
            <div className="space-y-4">
              {items?.map((item) => (
                <div
                  key={item.productId}
                  className="flex  gap-4 bg-slate-50 rouned-md  shadow py-2 px-2"
                >
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded-md border"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-600">
                      {item.title}
                    </h4>

                    <p>
                      ${item.price} x {item.qty}
                    </p>
                  </div>

                  <div className="font-bold text-gray-700">
                    ${item.price * item.qty.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* /// summery /  */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Order Summery</h3>

          <div className="text-sm space-y-2 mb-3">
            <div className="flex justify-between">
              <span>Items Price :</span>
              <span> ${itemsPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-sm space-y-2 mb-3">
            <div className="flex justify-between">
              <span>Shipping :</span>
              <span> ${shippingPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-sm space-y-2 mb-3">
            <div className="flex justify-between">
              <span>Tax Price :</span>
              <span> ${taxPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="text-sm space-y-2 mb-3">
            <div className="flex justify-between">
              <span>Total :</span>
              <span> ${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mb-4 text-sm text-gray-700 ">
            <p className="pt-3">
              <strong>
                Shipping to : {shippingAddress?.address} ,
                {shippingAddress?.city} , {shippingAddress?.country} ,
                {shippingAddress?.postalCode}
              </strong>
            </p>

            <p>
              <stron>Payment : {paymentMethod}</stron>
            </p>
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="bg-[#FE7743]"
            variant="outline"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Placeorder;
