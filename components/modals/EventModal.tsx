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
          <Button variant={"outline"}><Settings /></Button>
        ) : (
          <Button variant={"outline"}><Settings /></Button>
        )
      }
      title="Set event details"
      description="Please note that the event's address will only be visible if it falls within our designated serving area. If it does not, we kindly ask you to opt for local pick up instead."
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Switch
            checked={isDelivery}
            onCheckedChange={(value) => onChangeSwitch(value)}
          />
          <Label className="ml-3">Delivery?</Label>
          {isDelivery ? <TrueForm /> : <FalseForm />}
        </div>
      </div>
    </Modal>
  );
};
