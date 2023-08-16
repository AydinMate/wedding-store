"use client"

import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Product } from "@/types";
import useCart from "@/hooks/useCart";




const CartItems = () => {
    const cart = useCart();

    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
      }, []);
    
      if (!isMounted) {
        return null;
      }

     

  return (
    <div className="lg:col-span-7">
      {cart.items.length === 0 && (
        <p className="text-neutral-500">
          No items have been added to the cart.
        </p>
      )}
      <ul>
        {cart.items.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
