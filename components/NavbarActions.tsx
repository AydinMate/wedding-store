"use client";
import useCart from "@/hooks/useCart";
import Button from "@/components/ui/ButtonCustom";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useEventModal } from "@/hooks/useEventModal";
import { EventModal } from "./modals/EventModal";

const NavbarActions = () => {
  const router = useRouter();
  const cart = useCart();
  const eventModal = useEventModal();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <EventModal />
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
