"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
interface MainNavProps {
  data: Category[];
}



export const revalidate = 0;

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const sortedData = [...data].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  const routes = sortedData.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 ">
        <div className="grid grid-cols-2 gap-2 md:hidden lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-14" variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"}>
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4 justify-center">
                <SheetClose asChild>
                  <Link
                    href={"/"}
                    className={cn(
                      "text-center text-base font-medium transition-colors hover:text-black",
                      pathname === "/" ? "text-black" : "text-neutral-500"
                    )}
                  >
                    Home
                  </Link>
                </SheetClose>
                {routes.map((route) => {
                  return (
                    <SheetClose key={route.href} asChild>
                      <Link
                        className={cn(
                          "text-center text-base font-medium transition-colors hover:text-black",
                          route.active ? "text-black" : "text-neutral-500"
                        )}
                        
                        href={route.href}
                      >
                        {route.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
              <SheetFooter className="flex justify-center items-center">
                <SheetClose asChild>
                  <Button
                    className="w-[30%]"
                    variant={"secondary"}
                    type="submit"
                  >
                    Close
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {routes.map((route) => {
          return (
            <Link
              className={cn(
                "text-base font-medium transition-colors hover:text-black hidden sm:hidden md:block lg:block",
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
    </>
  );
};

export default MainNav;
