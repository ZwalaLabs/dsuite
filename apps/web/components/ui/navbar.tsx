import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "./button";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar: React.FC = () => {
  return (
    <nav className="flex  shadow-l fixed z-50 top-10 left-0 right-0">
      <div className="flex p-4 surface-background neutral-border-medium border-gray-700 border  backdrop-blur-md rounded-md  radius-m-4 shadow-l w-[400] mx-auto justify-between">
        <div className="text-2xl font-bold items-center">
          <Link href="/">
            <p className="bg-gradient-to-l from-gradientFrom to-gradientTo bg-clip-text text-transparent">
              D-Suite
            </p>
          </Link>
        </div>
        <div className="text-lg">
          <ConnectButton accountStatus="address" showBalance={false} chainStatus="name" />
        </div>
        {/* to-do: handle authentication means logout when user is logged in */}
      </div>
    </nav>
  );
};

export default Navbar;
