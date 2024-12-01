import Link from "next/link";
import CopyLinkButton from "./CopylinkButton";

const CustomNavbar: React.FC = () => {
	return (
		<nav className="flex shadow-l fixed z-50 top-10 left-0 right-0">
			<div className="flex p-4 items-center surface-background neutral-border-medium border-gray-700 border  backdrop-blur-md rounded-md  radius-m-4 shadow-l w-[400] mx-auto justify-between">
				<div className="text-2xl font-bold">
					<Link href="/">
						<p className="bg-gradient-to-l from-gradientFrom to-gradientTo bg-clip-text text-transparent">
							D-Suite
						</p>
					</Link>
				</div>
				<div className="text-lg flex gap-4 items-center">
					{/* wallet address and copy icon */}
					<p>Wallet address</p>
                    {/* copy icon */}
                    <CopyLinkButton walletAdd='walletAdd'/>
                </div>
			</div>
		</nav>
	);
};

export default CustomNavbar;
