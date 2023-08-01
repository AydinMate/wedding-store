"use client";

import axios, { AxiosError } from 'axios';
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/ButtonCustom";
import Currency from "@/components/ui/Currency";
import useCart from "@/hooks/useCart";
import { toast } from "react-hot-toast";
import EventDetails from "./EventDetails";
import { useEvent } from "@/hooks/useEvent";
import { EventModal } from "@/components/modals/EventModal";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productHires: items.map((item) => ({
            productId: item.id,
            hireDate: date.toISOString(),
          })),
          dropoffAddress: address,
          isDelivery: isDelivery,
          hireDate: date.toISOString()
        }
      );
      window.location = response.data.url;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.log(axiosError.response.data);
        console.log(axiosError.response.status);
        console.log(axiosError.response.headers);
      } else if (axiosError.request) {
        console.log(axiosError.request);
      } else {
        console.log('Error', axiosError.message);
      }
    }
    
  };
  

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        {isDelivery && address === "" ? <EventModal /> : <EventDetails />}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Order Total:
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0 || isDelivery && address === ""}
        onClick={onCheckout}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
