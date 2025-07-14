import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveShippingAdress } from "@/redux/cartSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (shippingAddress) {
      setAddress(shippingAddress?.address || "");
      setCity(shippingAddress?.city || "");
      setCountry(shippingAddress?.country || "");
      setPostalCode(shippingAddress?.postalCode || "");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAdress({ address, city, postalCode, country }));
    navigate("/shop/payment");
  };

  //   const handleNavigate = () => {};

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6 " onSubmit={submitHandler}>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                value={address}
                placeholder="123 main st"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                placeholder="doha"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalcode">Postal Code</Label>
              <Input
                placeholder="+252"
                id="postalcode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                placeholder="Qatar"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className="pt-2 ">
              <Button className="bg-green-600" variant="outline">
                Continue To Payment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingScreen;
