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

// Zod schema for form validation
const formSchema = z.object({
	meeting_name: z.string().min(2, {
		message: "Meeting name must be at least 2 characters.",
	}),
});

function CreateContractForm() {
	// 1. Define your form using react-hook-form with zod resolver
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			meeting_name: "",
		},
	});

	// 2. Define a submit handler
	function onSubmit(values: { meeting_name: string }) {
		// Do something with the form values
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="meeting_name"
					render={({ field }) => (
						<FormItem className="grow">
							<FormLabel>{FORM_CONTENT.CREATE_CONTRACT_FORM.LABEL}</FormLabel>
							<FormControl>
								<Input
									placeholder={FORM_CONTENT.CREATE_CONTRACT_FORM.PLACEHOLDER}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" variant="gradientButton">
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default CreateContractForm;
