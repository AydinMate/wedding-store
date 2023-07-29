"use client";

import { EventModal } from "@/components/modals/EventModal";
import { useEffect, useState } from "react";

interface EventModalProviderProps {}

const EventModalProvider: React.FC<EventModalProviderProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <EventModal />
    </>
  );
};

export default EventModalProvider;
