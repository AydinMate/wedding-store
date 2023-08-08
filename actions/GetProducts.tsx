import { Product, ProductHire } from "@/types";
import qs from "query-string";
import getHires from "./GetHires";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colourId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query, hireDate: string): Promise<Product[]> => {

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
  
  

  const dateRange = getDateRange(hireDate)

  const hires: ProductHire[] = await getHires({ startDate: dateRange.startDate, endDate: dateRange.endDate, isPaid: true });




  // Create a set of product IDs from the hires
  const hiredProductIds = new Set(hires.map(hire => hire.productId));

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colourId: query.colourId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);
  let products: Product[] = await res.json();

  // Filter out the products that are in the set of hired product IDs
  products = products.filter(product => !hiredProductIds.has(product.id));

  return products;
};

export default getProducts;
