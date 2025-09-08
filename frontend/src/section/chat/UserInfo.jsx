import { Dot, Globe, X } from "@phosphor-icons/react";
import React from "react";

export default function UserInfo({ user, handleToggleUserInfo }) {
  return (
    <>
      {/* Show this Below XL */}
      <div
        className={`xl:hidden fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-end bg-black/90 py-2`}
      >
        <div className="md:px-7.5 w-full max-w-142.5 bg-white dark:bg-boxdark md:py-4 px-4 py-6 min-h-screen">
          <UserProfile
            user={user}
            handleToggleUserInfo={handleToggleUserInfo}
          />
        </div>
      </div>

      {/* Show this Above XL */}
      <div className="xl:border-l hidden xl:flex flex-col h-full border-stroke dark:border-strokedark">
        <div className="sticky border-b border-stroke dark:border-strokedark flex flex-row items-center justify-between w-full px-6 py-7.5">
          <div className="text-black dark:text-white font-semibold text-lg">
            Profile
          </div>

          <button onClick={handleToggleUserInfo}>
            <X size={24} />
          </button>
        </div>

        <div className="mx-auto my-8">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              className="w-44 h-44 rounded-lg object-cover object-center"
            />
          ) : (
            <div
              className={`h-44 w-44 rounded-lg border border-stroke dark:border-strokedark bg-gray dark:bg-boxdark flex items-center justify-center text-body dark:text-white capitalize text-4xl`}
            >
              {user?.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="px-6 space-y-1">
          <div className="text-black dark:text-white text-xl font-medium">
            {user?.name}
          </div>
          <div
            className={`text-sm font-medium ${
              user?.status === "Online" ? "text-green-500" : "text-red"
            }`}
          >
            {user?.status}
          </div>

          <span className="text-body text-md">{user?.jobTitle}</span>
        </div>

        <div className="px-6 my-6">
          {user?.country && (
            <div className="flex flex-row items-center space-x-2">
              <Globe size={20} />
              <div>{user?.country}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const UserProfile = ({ user, handleToggleUserInfo }) => {
  return (
    <div className="flex flex-col h-full border-stroke dark:border-strokedark">
      <div className="sticky border-b border-stroke dark:border-strokedark flex flex-row items-center justify-between w-full px-6 py-7.5">
        <div className="text-black dark:text-white font-semibold text-lg">
          Profile
        </div>

        <button onClick={handleToggleUserInfo}>
          <X size={24} />
        </button>
      </div>

      <div className="mx-auto my-8">
        {user?.avatar ? (
          <img
            src={user?.avatar}
            className="w-44 h-44 rounded-lg object-cover object-center"
          />
        ) : (
          <div
            className={`h-44 w-44 rounded-lg border border-stroke dark:border-strokedark bg-gray dark:bg-boxdark flex items-center justify-center text-body dark:text-white capitalize text-4xl`}
          >
            {user?.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="px-6 space-y-1">
        <div className="text-black dark:text-white text-xl font-medium">
          {user?.name}
        </div>
        <div
          className={`text-sm font-medium ${
            user?.status === "Online" ? "text-green-500" : "text-red"
          }`}
        >
          {user?.status}
        </div>

        <span className="text-body text-md">{user?.jobTitle}</span>
      </div>

      <div className="px-6 my-6">
        {user?.country && (
          <div className="flex flex-row items-center space-x-2">
            <Globe size={20} />
            <div>{user?.country}</div>
          </div>
        )}
      </div>
    </div>
  );
};
