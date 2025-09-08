import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileForm, UpdatePasswordForm } from "../section/Profile";

export default function ProfilePage() {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = "text-primary border-primary";
  const inactiveClasses = "border-transparent";
  return (
    <div className="w-full min-h-screen overflow-y-auto no-scrollbar rounded-sm border border-stroke bg-white py-7.5 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Buttons for tabs */}
      <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
        <Link
          to="#"
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            openTab === 1 ? activeClasses : inactiveClasses
          } `}
          onClick={() => {
            setOpenTab(1);
          }}
        >
          Profile
        </Link>

        <Link
          to="#"
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            openTab === 2 ? activeClasses : inactiveClasses
          } `}
          onClick={() => {
            setOpenTab(2);
          }}
        >
          Update password
        </Link>
      </div>

      {/* Content for tabs */}
      <div>
        <div className={`${openTab === 1 ? "block" : "hidden"}`}>
          {/* Profile form */}
          <ProfileForm />
        </div>
        <div className={`${openTab === 2 ? "block" : "hidden"}`}>
          {/* Update Password form */}
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
