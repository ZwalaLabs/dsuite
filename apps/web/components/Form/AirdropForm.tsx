import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FORM_CONTENT } from "@/lib/constant";
import { Send } from "lucide-react";

// Zod schema for form validation
const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

function AirdropForm() {
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

	return (
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
							<FormLabel>{FORM_CONTENT.AIRDROPS_FORM.LABEL}</FormLabel>
							<FormControl>
								<Input
									placeholder={FORM_CONTENT.AIRDROPS_FORM.PLACEHOLDER}
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
	);
}

export default AirdropForm;
