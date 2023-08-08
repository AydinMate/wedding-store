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

const getProducts = async (query: Query): Promise<Product[]> => {

  

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
 const products: Product[] = await res.json();

  

  return products;
};

export default getProducts;
