import { MagnifyingGlass, Plus, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import _ from "lodash"; // Import lodash for debouncing
// Add Conversation
import AddConversation from "../../components/AddConversation";
import { useDispatch, useSelector } from "react-redux";
import {
  GetConversations,
  SetCurrentConversation,
} from "../../redux/slices/chat";

export default function ChatList({ open, handleClose }) {
  const dispatch = useDispatch();
  const [addConversation, setAddConversation] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Controlled input state
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term

  const { conversations, currentConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(GetConversations());
  }, [dispatch]);

  const handleToggleConversation = () => {
    setAddConversation((p) => !p);
  };

  const handleSelectConversation = (id) => {
    dispatch(SetCurrentConversation(id));
  };

  // Debounce search term for 500ms after the last input change
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler); // Clear timeout if searchTerm changes
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update searchTerm without delay
  };

  const filteredConversations = conversations
    .map((el) => {
      const other_user = el.participants.find((e) => e._id !== user._id);
      return {
        key: el._id,
        id: el._id,
        name: other_user.name,
        imgSrc: other_user.avatar,
        message: "",
        status: other_user.status,
      };
    })
    .filter((conversation) =>
      conversation.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase())
    ); // Filter based on debouncedSearchTerm

  return (
    <>
      <div className="hidden h-full flex-col xl:flex xl:w-1/4">
        <div className="sticky border-b border-stroke dark:border-strokedark px-6 py-7.5 flex flex-row justify-between items-center">
          <div className="flex flex-row">
            <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
              Active Conversations
            </h3>
            <span className="rounded-md border-[.5px] border-stroke dark:border-strokedark bg-gray px-2 py-0.5 text-base font-medium text-black dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
              {filteredConversations.length}
            </span>
          </div>

          <button onClick={handleToggleConversation}>
            <Plus size={20} />
          </button>
        </div>

        <div className="flex max-h-full flex-col overflow-auto p-5">
          <form className="sticky mb-7">
            <input
              placeholder="Search..."
              type="text"
              value={searchTerm} // Controlled input
              onChange={handleSearchChange} // Handle input change
              className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
            />

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <MagnifyingGlass size={20} />
            </button>
          </form>

          {filteredConversations.length === 0 ? (
            <div className="min-h-100 flex items-center justify-center">
              <button
                onClick={handleToggleConversation}
                className="flex flex-row items-center space-x-2 text-primary"
              >
                <Plus size={24} />
                <span className="font-medium">Add Conversation</span>
              </button>
            </div>
          ) : (
            <div className="no-scrollbar overflow-auto max-h-full space-y-2.5">
              {/* Chat List Item */}
              {filteredConversations.map((object) => {
                return (
                  <div
                    className={`flex cursor-pointer items-center rounded px-4 py-2 dark:hover:bg-strokedark ${
                      currentConversation === object.id
                        ? "bg-gray dark:bg-boxdark-2"
                        : "hover:bg-gray-2 dark:hover:bg-boxdark-2/90"
                    }`}
                    key={object.key}
                    onClick={() => {
                      handleSelectConversation(object.id);
                    }}
                  >
                    <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                      {object?.imgSrc ? (
                        <img
                          src={object.imgSrc}
                          alt="profile"
                          className="h-full w-full rounded-full object-cover object-center"
                        />
                      ) : (
                        <div
                          className={`h-11 w-11 rounded-full border border-stroke dark:border-strokedark bg-gray dark:bg-boxdark flex items-center justify-center text-body dark:text-white capitalize`}
                        >
                          {object?.name.charAt(0)}
                        </div>
                      )}

                      {object?.status === "Online" && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                      )}
                    </div>

                    <div className="w-full">
                      <h5 className="text-sm font-medium text-black dark:text-white">
                        {object.name}
                      </h5>

                      <p className="text-sm">{object.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div
        className={`xl:hidden ${
          open ? "flex" : "hidden"
        } fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-start bg-black/90 py-2`}
      >
        <div className="relative min-w-100 w-full h-full flex flex-col max-w-fit bg-white dark:bg-boxdark md:py-4 px-4 py-6 min-h-screen">
          {/* Close Button */}

          <div
            onClick={handleClose}
            className="xl:hidden absolute -right-10 top-5 p-2 bg-white dark:bg-boxdark dark:text-white text-body border-l-0 border border-stroke dark:border-strokedark rounded-r-xl hover:cursor-pointer"
          >
            <X size={24} />
          </div>

          <div className="sticky border-b border-stroke dark:border-strokedark px-6 py-7.5 flex flex-row justify-between items-center">
            <div className="flex flex-row">
              <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                Active Conversations
              </h3>
              <span className="rounded-md border-[.5px] border-stroke dark:border-strokedark bg-gray px-2 py-0.5 text-base font-medium text-black dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                {filteredConversations.length}
              </span>
            </div>

            <button onClick={handleToggleConversation}>
              <Plus size={20} />
            </button>
          </div>

          <div className="flex max-h-full flex-col overflow-auto p-5">
            <form className="sticky mb-7">
              <input
                placeholder="Search..."
                type="text"
                value={searchTerm} // Controlled input
                onChange={handleSearchChange} // Handle input change
                className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <MagnifyingGlass size={20} />
              </button>
            </form>

            {filteredConversations.length === 0 ? (
              <div className="min-h-100 flex items-center justify-center">
                <button
                  onClick={handleToggleConversation}
                  className="flex flex-row items-center space-x-2 text-primary"
                >
                  <Plus size={24} />
                  <span className="font-medium">Add Conversation</span>
                </button>
              </div>
            ) : (
              <div className="no-scrollbar overflow-auto max-h-full space-y-2.5">
                {/* Chat List Item */}
                {filteredConversations.map((object) => {
                  return (
                    <div
                      className={`flex cursor-pointer items-center rounded px-4 py-2 dark:hover:bg-strokedark ${
                        currentConversation === object.id
                          ? "bg-gray dark:bg-boxdark-2"
                          : "hover:bg-gray-2 dark:hover:bg-boxdark-2/90"
                      }`}
                      key={object.key}
                      onClick={() => {
                        handleSelectConversation(object.id);
                        if(handleClose) {
                          handleClose();
                        }
                      }}
                    >
                      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
                        {object?.imgSrc ? (
                          <img
                            src={object.imgSrc}
                            alt="profile"
                            className="h-full w-full rounded-full object-cover object-center"
                          />
                        ) : (
                          <div
                            className={`h-11 w-11 rounded-full border border-stroke dark:border-strokedark bg-gray dark:bg-boxdark flex items-center justify-center text-body dark:text-white capitalize`}
                          >
                            {object?.name.charAt(0)}
                          </div>
                        )}

                        {object?.status === "Online" && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success"></span>
                        )}
                      </div>

                      <div className="w-full">
                        <h5 className="text-sm font-medium text-black dark:text-white">
                          {object.name}
                        </h5>

                        <p className="text-sm">{object.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {addConversation && (
        <AddConversation
          open={addConversation}
          handleClose={handleToggleConversation}
        />
      )}
    </>
  );
}
