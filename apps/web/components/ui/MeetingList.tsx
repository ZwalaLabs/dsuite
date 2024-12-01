"use client";
import React from "react";

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
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Meetings</h1>
      <ul className="space-y-4">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {meeting.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(meeting.date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Address: {meeting.address}
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => alert(`Joining meeting: ${meeting.title}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Join
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Details
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500 text-center">No meetings found.</li>
        )}
      </ul>
    </div>
  );
};

export default MeetingList;
