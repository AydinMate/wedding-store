"use client";

import { Product } from "@/types";
import Currency from "@/components/ui/Currency";
import Button from "@/components/ui/ButtonCustom";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/useCart";
import { MouseEventHandler } from "react";
import { toast } from "react-hot-toast";
import { useEvent } from "@/hooks/useEvent";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const { isDelivery, address, date } = useEvent();
  

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDelivery && address === "") {
      toast.error("Please update your event's details first.");
      window.scrollTo(0, 0);
    } else {
      event.stopPropagation();
      cart.addItem(data);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Colour:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.colour?.value }}
          />
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
