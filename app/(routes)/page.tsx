import getBillboard from "@/actions/GetBillboard";
import getProducts from "@/actions/GetProducts";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/Container";
import { useEvent } from "@/hooks/useEvent";

export const revalidate = 0;

const HomePage = async () => {
  // const { date } = useEvent();
  const featuredProducts = await getProducts({ isFeatured: true });
  const billboard = await getBillboard(process.env.MAIN_PAGE_BILLBOARD_ID!);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={featuredProducts} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
