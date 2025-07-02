import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

const AdminProductCard = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div className="relative aspect-[4/3] sm:aspect-video">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover rounded-t-lg"
        />
        {product.salePrice > 0 && (
          <div className="absolute lef-2 top-0 text-orange-600 font-semibold px-2 py-1 rounded">
            Sale
          </div>
        )}
      </div>

      <CardContent className="p-3 sm:p-4">
        <h2 className="">{product?.title}</h2>

        <div className="flex items-center justify-between mt-2">
          <div className="text-gray-700">
            {product.salePrice > 0 ? (
              <div className="flex flex-col">
                <span className="text-sm sm:text-xs line-through text-muted-foreground">
                  {" "}
                  ${product?.price}
                </span>
                <span className="text-base sm:text-lg font-bold  text-orange-500">
                  ${product?.salePrice}
                </span>
              </div>
            ) : (
              <span className="font-semibold text-base sm:text-lg">
                ${product?.price}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-3 sm:px-3 border-t gap-2">
        <Button className="bg-green-500 ">Edit</Button>
        <Button className="text-red-500 bg-slate-100 hover:bg-orange-500 hover:text-slate-200">
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductCard;
