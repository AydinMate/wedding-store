"use client";
import { useEvent } from "@/hooks/useEvent";

import { Switch } from "../ui/switch";
import { TrueForm } from "./TrueForm";
import { FalseForm } from "./FalseForm";
import { Modal } from "../ui/Modal";
import { Label } from "../ui/label";

const today = new Date();

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const eighteenMonthsFromNow = new Date(today);
eighteenMonthsFromNow.setMonth(today.getMonth() + 18);

export const EventModal = () => {
  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();

  const onChangeSwitch = (value: any) => {
    setIsDelivery(value);
  };

  return (
    <Modal
      trigger={isDelivery && address === "" ? "Set your event" : "Update your event"}
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
