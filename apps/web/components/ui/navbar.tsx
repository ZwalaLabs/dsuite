import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Button } from "./button";

const Navbar: React.FC = () => {
	return (
		<nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
			<div className="text-2xl font-bold">
				<Link href="/">
                    {/* logo commented for the time being */}
					{/* <Image src="/logo.svg" alt="logo" height={40} width={40} /> */}
                    <p className='bg-gradient-to-l from-gradientFrom to-gradientTo bg-clip-text text-transparent'>D-Suite</p>
				</Link>
			</div>
			<div className="text-lg">
				<Link href="/login">
					<Button
                    variant='gradientButton'
					>
                        {/* account login */}
						Login
					</Button>
				</Link>
			</div>
            {/* to-do: handle authentication means logout when user is logged in */}
		</nav>
	);
};

export default Navbar;
