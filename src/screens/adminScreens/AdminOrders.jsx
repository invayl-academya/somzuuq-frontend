import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorComponent, Loading } from "@/components/Loading";
import { getAllOrders } from "@/redux/orderSlice";
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

const AdminOrders = () => {
  const { allOrders, loading, error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrders());
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

  const formatAddress = (shippingAddress) =>
    `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Orders</h2>
      </div>

      {loading && <Loading />}
      {error && <ErrorComponent error={error} />}

      {!loading && allOrders?.orders?.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-medium text-gray-900">
            No Orders Found
          </h3>
          <p className="mt-1 text-gray-500">No customer orders yet.</p>
          <div className="mt-5">
            <Button onClick={() => dispatch(getAllOrders())}>
              <RefreshCcwDot className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      )}

      {!loading && allOrders?.orders?.length > 0 && (
        <div className="space-y-4">
          {allOrders.orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              <div
                className="p-4 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderDetails(order._id)}
              >
                <div className="mb-2 md:mb-0">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {order.orderItems.length} item
                    {order.orderItems.length > 1 ? "s" : ""} by{" "}
                    <span className="text-blue-600 font-medium">
                      {order.user?.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:space-x-6">
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
                    {/* Items */}
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Items
                      </h3>
                      <div className="space-y-4">
                        {order?.orderItems.map((item) => (
                          <div key={item._id} className="flex">
                            <div className="w-20 h-20 border rounded overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Qty: {item.qty}
                              </p>
                              <p className="text-sm font-semibold text-gray-800">
                                ${(item.qty * item.price).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Summary
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
                        <div className="border-t pt-2 flex justify-between font-medium">
                          <span>Total</span>
                          <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1 flex items-center">
                            <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                            Payment
                          </h4>
                          <div className="text-sm text-gray-600">
                            {order.paymentMethod}
                          </div>
                          {order.isPaid && (
                            <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                              Paid on{" "}
                              {order.paidAt
                                ? format(new Date(order.paidAt), "MMM dd, yyyy")
                                : "N/A"}
                            </Badge>
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-1 flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            Shipping Address
                          </h4>
                          <address className="text-sm text-gray-600">
                            {formatAddress(order.shippingAddress)}
                          </address>

                          <div>
                            <Button
                              className="bg-orange-300 mt-3 w-full py-3"
                              variant="outline"
                            >
                              <Link to={`/admin/order/${order._id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
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

export default AdminOrders;
