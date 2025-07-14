import { ErrorComponent, Loading } from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchMyOrders } from "@/redux/orderSlice";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  MapPin,
  Package,
  RefreshCcwDot,
} from "lucide-react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderScreen = () => {
  const {
    myOrders: orders,
    loading,
    error,
  } = useSelector((state) => state.orders);

  const [expandedOrder, setExpandedOrder] = useState(null);

  const dispatch = useDispatch();
  console.log("orders", orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadge = (order) => {
    if (!order.isPaid) {
      return {
        text: "Payment Pending",
        icon: <Clock className="w-4 h-4 mr-1" />,
        color: "bg-yellow-100 text-yellow-800",
      };
    }
    if (!order.isDelivered) {
      return {
        text: "Processing",
        icon: <Package className="w-4 h-4 mr-1" />,
        color: "bg-blue-100 text-blue-800",
      };
    }
    return {
      text: "Delivered",
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
      color: "bg-green-100 text-green-800",
    };
  };

  const formatAddress = (shippingAddress) => {
    return `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`;
  };
  return (
    <div className="p-4 md:p-4 max-w-7xl max-w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 py-2">My Orders</h2>
      </div>

      {loading && <Loading />}
      {error && <ErrorComponent error={error} />}

      {!loading && orders?.length === 0 && (
        <div className="text-center py-12 ">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-medium text-gray-900">
            No Orders Founds
          </h3>
          <p className="mt-1 text-gray-500"> you haven't placed Any Orders</p>

          <div className="mt-5">
            <Button variant="default" onClick={() => dispatch(fetchMyOrders())}>
              <RefreshCcwDot className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      )}

      {!loading && orders?.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              <div
                className="p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleOrderDetails(order._id)}
              >
                <div className="mb-2 md:mb-0">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">
                      Order #{order._id.substring(18, 24).toUpperCase()}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {order.orderItems.length} item
                    {order.orderItems.length > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end md:space-x-6">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </div>
                    <div className="mt-1">
                      <Badge
                        className={`text-xs ${getStatusBadge(order).color}`}
                      >
                        {getStatusBadge(order).icon}
                        {getStatusBadge(order).text}
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedOrder === order._id ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="border-t p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Order Items */}
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Items
                      </h3>
                      <div className="space-y-4">
                        {order?.orderItems.map((item) => (
                          <div key={item._id} className="flex">
                            <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                Qty: {item.qty}
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-900">
                                ${(item.price * item.qty).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Order Summary
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>${order.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span>${order.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span>${order.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                          <span className="text-gray-900">Total</span>
                          <span className="text-gray-900">
                            ${order.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                            Payment
                          </h3>
                          <div className="text-sm text-gray-600">
                            <div>{order.paymentMethod}</div>
                            {order.isPaid && (
                              <div className="mt-1">
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  Paid on{" "}
                                  {format(
                                    new Date(order.paidAt),
                                    "MMM dd, yyyy"
                                  )}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            Shipping Address
                          </h3>
                          <address className="text-sm not-italic text-gray-600">
                            {formatAddress(order.shippingAddress)}
                          </address>

                          <Button
                            variant="outline"
                            className="bg-orange-400 px-4 text-slate-800 py-3 mt-3"
                          >
                            <Link to={`/shop/order/${order._id}`}>
                              Check Order
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
