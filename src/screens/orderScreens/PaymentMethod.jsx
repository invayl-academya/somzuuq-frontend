import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { savePaymentMethod } from "@/redux/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);
  const [selectMethod, setSelectMethod] = useState(paymentMethod || "PayPal");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shop/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(selectMethod));
    navigate("/shop/placeorder");
  };

  return (
    <div className="flex justify-center items-center min-h-[400px] bg-muted px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler}>
            <RadioGroup value={selectMethod} onValueChange={setSelectMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PayPal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>

              <div className="flex items-center space-x-2 pb-2">
                <RadioGroupItem value="Stripe" id="stripe" />
                <Label htmlFor="stripe">Stripe</Label>
              </div>
            </RadioGroup>

            <Button className="bg-blue-300" variant="outline py-3 mt-2 ">
              Continue to Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethod;
