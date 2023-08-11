"use client";

import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";
import MobileFilters from "./MobileFilters";
import { Category, Colour, Product, ProductHire, Size } from "@/types";
import { useEvent } from "@/hooks/useEvent";
import getHires from "@/actions/GetHires";

interface ProductsProps {
  products: Product[];
  sizes: Size[];
  colours: Colour[];
}

const Products: React.FC<ProductsProps> = ({ products, sizes, colours }) => {


    const { date } = useEvent();
    const [hires, setHires] = useState<ProductHire[]>([]);
  
    function getDateRange(dateString: string) {
      // Extract the date part of the input string
      const datePart = dateString.split("T")[0];
  
      // Split the date part into year, month, and day
      const [year, month, day] = datePart.split("-").map(Number);
  
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
  
        // Fetch hires where isPaid is true
        const paidHires = await getHires({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          isPaid: true,
        });
  
        // Fetch hires where isCash is true
        const cashHires = await getHires({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          isCash: true,
        });
        // Combine the results, removing duplicates
        const combinedHires = paidHires.concat(
          cashHires.filter(
            (item) =>
              !paidHires.some((paidItem) => paidItem.productId === item.productId)
          )
        );
  
        setHires(combinedHires);
      }
  
      fetchHires();
    }, [date]);
  
  
    // Create a set of product IDs from the hires
    const hiredProductIds = new Set(hires.map((hire) => hire.productId));
  
    // Filter out the products that are in the set of hired product IDs
    const availableProducts = products.filter(
      (product) => !hiredProductIds.has(product.id)
    );
  


  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-24">
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <MobileFilters sizes={sizes} colours={colours} />
        <div className="hidden lg:block">
          <Filter valueKey="sizeId" name="Sizes" data={sizes} />
          <Filter valueKey="colourId" name="Colours" data={colours} />
        </div>
        <div className="mt-6 lg:col-span-4 lg:mt-0">
          {availableProducts.length === 0 && <NoResults />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableProducts.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
