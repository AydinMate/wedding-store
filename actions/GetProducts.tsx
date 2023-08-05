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

const getProducts = async (query: Query, eventDate: string): Promise<Product[]> => {
  // Fetch all hires for the event date
  const hires: ProductHire[] = await getHires({ hireDate: eventDate, isPaid: true });


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
