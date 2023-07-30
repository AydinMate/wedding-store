"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEvent } from "@/hooks/useEvent";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  description: string;
  trigger: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  trigger,
  children,
}) => {
  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          isDelivery && address === "" ? "text-red-500" : "text-green-500",
          "font-bold hover:translate-y-[-2px]"
        )}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
