"use client";
import { useEvent } from "@/hooks/useEvent";
import React from "react";

interface NavEventDetailsProps {}

const NavEventDetails: React.FC<NavEventDetailsProps> = ({}) => {
  const { date, isDelivery } = useEvent();

  const deliveryString = isDelivery ? "Delivery" : "Pick up";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${days[date.getUTCDay()]} ${date.getUTCDate()} ${
    months[date.getUTCMonth()]
  } ${date.getUTCFullYear()}`;

  return (
    <div>
      <p>{deliveryString} on</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default NavEventDetails;
