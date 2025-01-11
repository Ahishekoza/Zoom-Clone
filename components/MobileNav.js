"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarMenuLinks } from "@/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div className="sm:hidden">
      <Sheet key={"left"}>
        <SheetTrigger>
          <Image
            src={"/icons/hamburger.svg"}
            width={36}
            height={36}
            alt="hamburger"
            className="cursor-pointer "
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-dark-1 border-none max-w-[264px] "
        >
          <Link href={"/"} className="flex items-center gap-1">
            <Image src={"/icons/logo.svg"} width={32} height={32} alt="YOOM" />
            <p className="text-[26px] font-extrabold text-white">Yoom</p>
          </Link>
          <div className="flex flex-col h-[calc(100vh-72px)] justify-between ">
            <section className="pt-16 flex flex-col h-full gap-6 text-white">
              {sidebarMenuLinks.map((item) => {
                const isActive = pathname === item.route;

                return (
                  <SheetClose key={item.route} asChild>
                    <Link
                      href={item.route}
                      key={item.label}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full max-w-60 ",
                        {
                          "bg-blue-1": isActive,
                        }
                      )}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={24}
                        height={24}
                      />
                      <p className="text-lg font-semibold">{item.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
