import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="w-full fixed flex justify-between items-center px-6 py-4 lg:px-10 bg-dark-1 z-50">
      <Link href={"/"} className="flex items-center gap-1">
        <Image src={"/icons/logo.svg"} width={32} height={32} alt="YOOM" />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>
      <div className="flex items-center gap-5 text-white">
        <SignedIn>
          <UserButton />
        </SignedIn>

        {/* ---Mobile-Nav--- small devices */}
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
