import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);
  const data = await res.json();

  // Convert createdAt strings to Date objects
  const categories = data.map((category: Category) => ({
    ...category,
    createdAt: new Date(category.createdAt),
  }));

  return categories;
};

export default getCategories;
