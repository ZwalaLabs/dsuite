import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

export default function Modal({
	title,
	description,
	isOpen,
	onClose,
    Component,
	AdditionalComponent
}: {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
    Component: React.FC;
    AdditionalComponent: React.FC;
}) {
	if (!isOpen) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{/* Use the Form component from shadcn/ui */}
                <Component/>
				{/* Additional Component to render */}
				<AdditionalComponent/>
			</DialogContent>
		</Dialog>
	);
}
