import {ProductHire } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/hires`;

interface Query {
  productId?: string;
  startDate?: string;
  endDate?: string;
  isPaid?: boolean;
}

const getHires = async (query: Query): Promise<ProductHire[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      productId: query.productId,
      startDate: query.startDate,
      endDate: query.endDate,
      isPaid: query.isPaid,
    },
  });

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

export default getHires;


