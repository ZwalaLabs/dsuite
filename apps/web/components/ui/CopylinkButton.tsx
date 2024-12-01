"use client";
import { useToast } from "../../hooks/use-toast";
import { Button } from "./button";
import { Copy } from "lucide-react";

const CopyLinkButton = ({ walletAdd }: { walletAdd: string }) => {
	const { toast } = useToast();
	const copyToClipboard = (walletAddress: string) => {
		const textToCopy = walletAddress;
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				console.log(textToCopy);	
			})
			.catch((err) => {
				console.error("Failed to copy: ", err);
			});
			toast({
				title: "Copied to clipboard",
			});
	};

	return (
		<Button variant="gradientButton" onClick={() => copyToClipboard(walletAdd)}>
			<Copy />
		</Button>
	);
};

export default CopyLinkButton;
