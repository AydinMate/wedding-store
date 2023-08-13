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
  trigger: React.ReactElement;
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
      <DialogTrigger>
        {trigger}
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:w-[100%]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div>{children}</div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
