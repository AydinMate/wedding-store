"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

export const revalidate = 0; 

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const sortedData = [...data].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const routes = sortedData.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        return (
          <Link
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500"
            )}
            key={route.href}
            href={route.href}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;



//old routes:
// const routes = data.map((route) => ({
//   href: `/category/${route.id}`,
//   label: route.name,
//   active: pathname === `/category/${route.id}`,
// }));
