"use client";
import MeetingList from "@/components/ui/MeetingList";
import { DASHBOARD, FORM_CONTENT } from "@/lib/constant";
import CustomNavbar from "@/components/ui/customNavbar";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import CreateContractForm from "@/components/Form/CreateContractForm";
import { Button } from "@/components/ui/button";

const Page = () => {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const toggleCreateModal = () => {
		setShowCreateModal((prev) => !prev);
	};
	const meetingList = [
		{
			id: 1,
			title: "Meeting 1",
			date: "Date 1", // ISO format date string
			address: "xyz",
		},
		{
			id: 2,
			title: "Meeting 2",
			date: "Date 2", // ISO format date string
			address: "abc",
		},
	];
	return (
		<>
			<CustomNavbar />
			<div className="main-wrapper">
				<div className="action-bar">
					<Button
						variant={"gradientButton"}
						// toggling state based on this button
						onClick={toggleCreateModal}
						className="focus:outline-none font-semibold h-12 px-6 rounded-sm flex items-center justify-center sm:w-auto"
					>
						{DASHBOARD.CREATE_MEET}
					</Button>
				</div>
				<div className="meeting-list">
					<MeetingList meetings={meetingList} />
				</div>
			</div>
			<Modal
				title={FORM_CONTENT.CREATE_CONTRACT_FORM.TITLE}
				description={FORM_CONTENT.CREATE_CONTRACT_FORM.DESCRIPTION}
				isOpen={showCreateModal}
				onClose={toggleCreateModal}
				Component={CreateContractForm}
				AdditionalComponent={() => null}
			/>
		</>
	);
};

export default Page;
