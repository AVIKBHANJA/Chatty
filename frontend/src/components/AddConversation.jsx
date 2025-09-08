import React, { useEffect } from "react";
import { PaperPlaneTilt, X } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, StartConversation } from "../redux/slices/chat";

export default function AddConversation({ open, handleClose }) {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.chat);

  useEffect(() => {
    // dispatch GetUsers
    dispatch(GetUsers());
  }, []);

  const handleStartConversation = (id) => {
    dispatch(
      StartConversation({
        userId: id,
      })
    );
    handleClose();
  };

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark md:py-8 px-8 py-12">
        <div className="flex flex-row items-center justify-between mb-6 px-4">
          <span className="font-semibold">Start Conversation</span>
          <button onClick={handleClose}>
            <X size={24} />
          </button>
        </div>
        <div className="no-scrollbar overflow-auto md:max-h-150 sm:max-h-100 space-y-2.5">
          {/* Chat List Item */}
          {users.map((object, index) => {
            return (
              <div
                className="flex flex-row justify-between cursor-pointer items-center rounded px-4 py-2 dark:hover:bg-strokedark hover:bg-gray-2 dark:hover:bg-boxdark-2/90"
                key={object._id}
              >
                <div className="flex flex-row items-center space-x-2">
                  <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                    {object?.avatar ? (
                      <img
                        src={object.avatar}
                        alt="profile"
                        className="h-full w-full rounded-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-11 w-11 rounded-full bg-gray dark:bg-boxdark-2 flex items-center justify-center text-body dark:text-white capitalize">
                        {object?.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <h5 className="text-sm font-medium text-black dark:text-white">
                      {object.name}
                    </h5>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleStartConversation(object._id);
                  }}
                  className="text-primary"
                >
                  <PaperPlaneTilt size={24} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
