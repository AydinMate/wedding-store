import getCategory from "@/actions/GetCategory";
import getColours from "@/actions/GetColours";
import getProducts from "@/actions/GetProducts";
import getSizes from "@/actions/GetSizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/Container";
import Products from "./components/Products";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colourId: string;
    sizeId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colourId: searchParams.colourId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colours = await getColours();
  const category = await getCategory(params.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <Products
          products={products}
          sizes={sizes}
          colours={colours}
        />
      </Container>
    </div>
  );
};

export default CategoryPage;
