"use client";
import { useEvent } from "@/hooks/useEvent";

import { Switch } from "../ui/switch";
import { TrueForm } from "./TrueForm";
import { FalseForm } from "./FalseForm";
import { Modal } from "../ui/Modal";
import { Label } from "../ui/label";
import useCart from "@/hooks/useCart";
import { useEffect } from "react";
import NavEventDetails from "./NavEventDetails";
import { Cog, Settings, Settings2 } from "lucide-react";
import { Button } from "../ui/button";

export const EventModal = () => {
  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();

  const cart = useCart();

  useEffect(() => {
    cart.removeAll();
  }, [date]);

  const onChangeSwitch = (value: any) => {
    setIsDelivery(value);
  };

  return (
    <Modal
      trigger={
        isDelivery && address === "" ? (
          <Button
            className="text-red-500 hover:text-red-500"
            variant={"outline"}
          >
            <Settings />
          </Button>
        ) : (
          <Button
            className="text-green-500 hover:text-green-500"
            variant={"outline"}
          >
            <Settings />
          </Button>
        )
      }
      title="Set event details"
      description={isDelivery ? "Please note that the event's address will only be visible if it falls within our designated serving area. If it does not, we kindly ask you to opt for local pick up instead." : "Local pick up in Ballarat."}
    >
      <div>
        <div className="py-2 pb-4 flex flex-row justify-center items-center">
          <Label className="mr-3">Delivery?</Label>
          <Switch
            checked={isDelivery}
            onCheckedChange={(value) => onChangeSwitch(value)}
          />
        </div>
        <div>{isDelivery ? <TrueForm /> : <FalseForm />}</div>
      </div>
    </Modal>
  );
};
