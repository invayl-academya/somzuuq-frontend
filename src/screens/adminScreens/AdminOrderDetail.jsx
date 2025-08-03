import { ErrorComponent, Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/redux/constants";
import { fetchOrderById } from "@/redux/orderSlice";
import axios from "axios";
import {
  CheckCircle,
  XCircle,
  Truck,
  CreditCard,
  Package,
  Calendar,
  MapPin,
  Mail,
  User,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminOrderDetail = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.orders);
  const { user: userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [orderId, dispatch]);

  const handleOrderToDeliver = async () => {
    try {
      await axios.put(
        `${APP_URL}/orders/${orderId}/deliver`,
        {},
        { withCredentials: true }
      );
      toast.success("Order marked as delivered");
      dispatch(fetchOrderById(orderId));
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to mark as delivered"
      );
    }
  };

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
    paidAt,
    isDelivered,
    deliveredAt,
    createdAt,
  } = orderDetails;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Order #{orderId.substring(14)} ...
          </h1>
          <p className="text-gray-500 flex items-center gap-2 mt-1">
            <Calendar className="w-4 h-4" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isPaid ? "Paid" : "Unpaid"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isDelivered
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {isDelivered ? "Delivered" : "Processing"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Order Items
              </h2>
            </div>
            <div className="divide-y">
              {orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      ${(item.qty * item.price).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Shipping Information
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">Customer</p>
                    <p className="font-medium text-gray-800">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="font-medium text-gray-800">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-sm">Address</p>
                    <p className="font-medium text-gray-800">
                      {shippingAddress?.address}, {shippingAddress?.city}
                      <br />
                      {shippingAddress?.postalCode}, {shippingAddress?.country}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                {isDelivered ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Delivered on {new Date(deliveredAt).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg">
                    <XCircle className="w-5 h-5" />
                    <span>Not Delivered</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Payment Information
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">Method</p>
                  <p className="font-medium text-gray-800 capitalize">
                    {paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  {isPaid ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>Paid on {new Date(paidAt).toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-5 h-5" />
                      <span>Not Paid</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">
                  ${(itemsPrice || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-gray-800">
                  ${(shippingPrice || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-800">
                  ${(taxPrice || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="py-3 border-t border-b border-gray-200 my-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-indigo-600 text-lg">
                  ${(totalPrice || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Deliver Button */}
            {userInfo?.isAdmin && isPaid && !isDelivered && (
              <Button
                onClick={handleOrderToDeliver}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-md transition-all hover:shadow-lg"
              >
                Mark as Delivered
              </Button>
            )}
          </div>

          {/* Customer Support */}
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-medium text-indigo-800 mb-3">
              Need help with this order?
            </h3>
            <p className="text-sm text-indigo-600 mb-4">
              Contact our support team if you have any questions about this
              order.
            </p>
            <Button
              variant="outline"
              className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-100"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
