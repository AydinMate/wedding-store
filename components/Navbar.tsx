import Container from "@/components/ui/Container";
import MainNav from "@/components/MainNav";
import Link from "next/link";
import getCategories from "@/actions/GetCategories";
import NavbarActions from "@/components/NavbarActions";
import { Gem } from "lucide-react";



const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href={"/"} className="ml-4 flex lg:ml-0 gap-x-2">
            <div><Gem  className="h-10 w-10 hover:opacity-70"/></div>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
