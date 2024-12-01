import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar: React.FC = () => {
  return (
    <nav className="flex  shadow-l fixed z-50 top-10 left-0 right-0 p-4 surface-background neutral-border-medium border-gray-700 border  backdrop-blur-md rounded-md  radius-m-4 shadow-l w-[400] mx-auto justify-between items-center">
      <p className="text-2xl font-bold items-center bg-gradient-to-l from-gradientFrom to-gradientTo bg-clip-text text-transparent">
        <Link href="/">D-Suite</Link>
      </p>
      <div className="text-lg">
        <ConnectButton accountStatus="address" showBalance={false} chainStatus="name" />
      </div>
    </nav>
  );
};

export default Navbar;
