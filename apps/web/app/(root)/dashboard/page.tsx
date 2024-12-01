import MeetingList from "@/components/ui/MeetingList";
import { DASHBOARD } from "@/lib/constant";
import Link from "next/link";
import CustomNavbar from "@/components/ui/customNavbar";

const page = () => {
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
        <Link
          // add meeting link if logged in else navigate to login link
          href=""
          className="bg-slate-900 hover:bg-slate-700 focus:outline-none text-white font-semibold h-12 px-6 rounded-sm flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
        >
          {DASHBOARD.CREATE_MEET}
        </Link>
      </div>
      <div className="meeting-list">
        {meetingList.length ? (
          <MeetingList meetings={meetingList} />
        ) : (
          "No Meetings Found"
        )}
      </div>
    </div>
    </>
  );
};

export default page;
