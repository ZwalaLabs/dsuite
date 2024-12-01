import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { Button } from "./button";
import { Send } from "lucide-react";
import { Button } from "./button";
import { AIRDROPS_RECEIVED_USER_LIST, FORM_CONTENT } from "@/lib/constant";

// Zod schema for form validation
const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

export default function DialogFormComponent({
	title,
	description,
	isOpen,
	onClose,
}: {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
}) {
	// 1. Define your form using react-hook-form with zod resolver
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	// 2. Define a submit handler
	function onSubmit(values: { username: string }) {
		// Do something with the form values
		console.log(values);
	}

	if (!isOpen) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				{/* Use the Form component from shadcn/ui */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 flex gap-2 w-full"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="grow">
									<FormLabel>{FORM_CONTENT.WALLET_LABEL}</FormLabel>
									<FormControl>
										<Input
											placeholder={FORM_CONTENT.WALLET_PLACEHOLDER}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" variant="gradientButton">
							<Send />
						</Button>
					</form>
				</Form>
				<hr />
				{/* heading  */}
                <h1 className="text-green-500">{FORM_CONTENT.SUCCESSFUL_INVITE}</h1>
				{/* people list */}
				{AIRDROPS_RECEIVED_USER_LIST.map(
					({ id, walletNumber }: { id: number; walletNumber: string }) => (
						<p key={id}>{walletNumber}</p>
					)
				)}
			</DialogContent>
		</Dialog>
	);
}
