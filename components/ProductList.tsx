"use client";

import { Product, ProductHire } from "@/types";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";
import { useEvent } from "@/hooks/useEvent";
import getHires from "@/actions/GetHires";
import { useEffect, useState } from "react";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  const { date } = useEvent();
  const [hires, setHires] = useState<ProductHire[]>([]);

  function getDateRange(dateString: string) {
    // Extract the date part of the input string
    const datePart = dateString.split('T')[0];
  
    // Split the date part into year, month, and day
    const [year, month, day] = datePart.split('-').map(Number);
  
    // Create new Date objects for the start and end of the day in UTC
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
  
    // Return the start and end dates as strings in the same format as the input
    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }
  
  

  useEffect(() => {
    async function fetchHires() {
      const dateRange = getDateRange(date.toISOString());
      const hiresData = await getHires({ startDate: dateRange.startDate, endDate: dateRange.endDate, isPaid: true });
      setHires(hiresData);
    }

    fetchHires();
  }, [date]);

  // Create a set of product IDs from the hires
  const hiredProductIds = new Set(hires.map(hire => hire.productId));

  // Filter out the products that are in the set of hired product IDs
  const availableProducts = items.filter(product => !hiredProductIds.has(product.id));

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {availableProducts.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableProducts.map((item) => {
          return <ProductCard key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
