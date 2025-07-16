import { ErrorComponent, Loading } from "@/components/Loading";
import { fetchOrderById, fetchPaypalClientId } from "@/redux/orderSlice";
import { Check, DiscAlbum, X } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PaypalCheckout from "./PaypalCheckout";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderDetailScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.orders);
  console.log("det", orderDetails);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [orderId, dispatch]);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPayPalScript = async () => {
      try {
        const clientId = await dispatch(fetchPaypalClientId()).unwrap();
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      } catch (error) {
        console.log("error to load paypal script", error);
      }
    };

    loadPayPalScript();
  }, [dispatch, paypalDispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  if (!orderDetails) return null;

  const {
    shippingAddress,
    user,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    createdAt,
    isDelivered,
  } = orderDetails;

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-7">order Summery </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* // left side - details  */}
        <div className="lg:col-span-2  space-y-6">
          {/* shipping info  */}
          <div className="bg-white rounded-xl border p-5 shadow-lg">
            <h2>Shipping information</h2>
            <div>
              <p>
                <span>{user?.name}</span>
              </p>

              <p>
                <span>{user?.email}</span>
              </p>

              <p>
                <span>address :</span>
                {shippingAddress?.address} {shippingAddress?.city}{" "}
                {shippingAddress?.postalCode} {shippingAddress?.country}
              </p>
            </div>

            <p
              className={`mt-3 font-semibold ${
                isDelivered ? "text-green-600" : "text-red-600"
              }`}
            >
              {isDelivered ? (
                <p className="flex items-center space-x-3">
                  <Check /> Delivered
                </p>
              ) : (
                <span className="flex items-center space-x-3">
                  <X /> not Delivered
                </span>
              )}
            </p>
          </div>

          {/* payment info  */}
          <div className="">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              payment Method
            </h2>
            <p>{paymentMethod}</p>

            <p
              className={`mt-3 font-semibold ${
                isPaid ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPaid ? (
                <p className="flex items-center space-x-3">
                  <Check /> paid
                </p>
              ) : (
                <span className="flex items-center space-x-3">
                  <X /> not Paid
                </span>
              )}
            </p>
          </div>
          {/* // right side details  */}
          <div className="bg-white rounded-xl p-5 border shadow-md">
            <h2>Order Items </h2>
            {orderItems?.map((item, index) => (
              <div key={item._id}>
                <img
                  src={item.image}
                  className="w-16 h-16 object-cover rounded border"
                />

                <div className="flex-1">
                  <p className="font-medium text-slate-400">{item.name}</p>
                  <p className="text-sm text-[#0E2148]">
                    {item.qty} x {item.price}
                    <span className="font-semibold ml-3">
                      ${(item.qty * item.price).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* // price Sumery  */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border p-5 ">
            <h2 className="text-2xl font-semibold text-gray-700">
              Price Summery
            </h2>

            <div className="text-sm space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>items Price</span>
                <span>{itemsPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping Price</span>
                <span>{shippingPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax Price (15%)</span>
                <span>{taxPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Total Price</span>
                <span>${totalPrice?.toFixed(2)}</span>
              </div>

              <p>Order Placed on : {new Date(createdAt).toLocaleString()}</p>
            </div>

            <div className="mt-3">
              {!isPaid && (
                <div className="bg-white rounded-xl p-4 shadow-lg">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Complete Payment
                  </h2>
                  {isPending ? (
                    <Loading />
                  ) : (
                    <PaypalCheckout orderId={orderId} totalPrice={totalPrice} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailScreen;
