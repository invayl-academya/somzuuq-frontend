import { APP_URL } from "@/redux/constants";
import { fetchOrderById } from "@/redux/orderSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";

const PaypalCheckout = ({ orderId, totalPrice }) => {
  const dispatch = useDispatch();
  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      const paymentResult = {
        id: details.id,
        status: details.status,
        update_time: details.update_time,
        payer: {
          email_address: details.payer.email_address,
        },
      };

      await axios.put(`${APP_URL}/orders/${orderId}/pay`, paymentResult, {
        withCredentials: true,
      });

      dispatch(fetchOrderById(orderId));
    } catch (error) {
      console.log("payment approve failed", error);
    }
  };

  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) =>
        actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice.toFixed(2),
              },
            },
          ],
        })
      }
      onApprove={handleApprove}
      onError={(err) => console.log("paypal error :", err)}
    />
  );
};

export default PaypalCheckout;
