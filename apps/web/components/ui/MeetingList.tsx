import React, { useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import AirdropForm from "../Form/AirdropForm";
import AirdropModal from "../Modal/Modal";
import {
  AIRDROPS_RECEIVED_USER_LIST,
  DASHBOARD,
  FORM_CONTENT,
} from "@/lib/constant";
import { X } from "lucide-react";

type Meeting = {
  id: number;
  title: string;
  date: string; // ISO format date string
  address: string;
};

type MeetingListProps = {
  meetings: Meeting[];
};

const MeetingList: React.FC<MeetingListProps> = ({ meetings }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen((modalState) => !modalState);
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-1xl sm:text-2xl font-bold mb-4">Your Meetings</h1>
      <ul className="space-y-4">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="bg-white rounded-lg shadow-md p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between alig  hover:shadow-lg transition-shadow"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {meeting.title}
                </h2>
                <p className="text-sm text-gray-500">{meeting.date}</p>
                <p className="text-sm text-gray-500">
                  Address: {meeting.address}
                </p>
              </div>
              <div className="flex sm:flex-col gap-5 sm:gap-1 mt-1 sm:mt-0">
                {/* Open meeting page */}
                <Button
                  onClick={() => alert(`Joining meeting: ${meeting.title}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 transition-colors"
                >
                  Join
                </Button>
                {/* Add onclick to open modal to show meeting details */}
                <Button
                  onClick={toggleModal}
                  className="px-4 py-2 border border-black rounded-sm transition-colors"
                  variant="gradientButton"
                >
                  Details
                </Button>
              </div>
            </li>
          ))
        ) : (
          <li className="flex flex-col justify-center items-center gap-1 text-gray-500">
            <Image src="./void.svg" alt="void" width={100} height={100} />
            Oops. No meetings found.
          </li>
        )}
      </ul>
      <AirdropModal
        title={FORM_CONTENT.AIRDROPS_FORM.TITLE}
        description={FORM_CONTENT.AIRDROPS_FORM.DESCRIPTION}
        isOpen={modalOpen}
        onClose={toggleModal}
        Component={AirdropForm}
        AdditionalComponent={() => (
          <>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="gradientButton"
                className="text-red-600"
              >
                Delete Meeting
                <X />
              </Button>
            </div>
            <hr />
            {/* heading  */}
            <h1 className="text-green-500">{DASHBOARD.SUCCESSFUL_INVITE}</h1>
            {/* people list */}
            {AIRDROPS_RECEIVED_USER_LIST.map(
              ({ id, walletNumber }: { id: number; walletNumber: string }) => (
                <p key={id}>{walletNumber}</p>
              )
            )}
          </>
        )}
      />
    </div>
  );
};

export default MeetingList;
