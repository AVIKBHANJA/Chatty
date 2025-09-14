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
      <div className="hidden h-full flex-col xl:flex w-80 bg-white dark:bg-gray-800">
        <div className="px-6 py-6 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Messages
            </h3>
            <div className="flex items-center space-x-3">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-sm font-medium">
                {filteredConversations.length}
              </span>
              <button
                onClick={handleToggleConversation}
                className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              placeholder="Search conversations..."
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MagnifyingGlass size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3">
          {filteredConversations.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <button
                onClick={handleToggleConversation}
                className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                <Plus size={20} />
                <span>Start New Chat</span>
              </button>
            </div>
          ) : (
            <div className="space-y-1 py-2">
              {filteredConversations.map((object) => {
                const isSelected = currentConversation === object.id;
                return (
                  <div
                    className={`flex items-center space-x-3 rounded-lg px-3 py-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    key={object.key}
                    onClick={() => handleSelectConversation(object.id)}
                  >
                    <div className="relative flex-shrink-0">
                      {object?.imgSrc ? (
                        <img
                          src={object.imgSrc}
                          alt="profile"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold">
                          {object?.name.charAt(0)}
                        </div>
                      )}

                      {object?.status === "Online" && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {object.name}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {object.message || "Start a conversation"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`xl:hidden ${
          open ? "flex" : "hidden"
        } fixed left-0 top-0 z-50 flex h-full min-h-screen w-full items-center justify-start bg-black/50 py-2`}
      >
        <div className="relative w-80 h-full flex flex-col bg-white dark:bg-gray-800">
          {/* Close Button */}
          <div
            onClick={handleClose}
            className="absolute -right-10 top-5 p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-l-0 border border-gray-200 dark:border-gray-700 rounded-r-xl cursor-pointer"
          >
            <X size={24} />
          </div>

          <div className="px-6 py-6 bg-white dark:bg-gray-800 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Messages
              </h3>
              <div className="flex items-center space-x-3">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-sm font-medium">
                  {filteredConversations.length}
                </span>
                <button
                  onClick={handleToggleConversation}
                  className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                placeholder="Search conversations..."
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <MagnifyingGlass size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3">
            {filteredConversations.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <button
                  onClick={handleToggleConversation}
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 font-medium"
                >
                  <Plus size={20} />
                  <span>Start New Chat</span>
                </button>
              </div>
            ) : (
              <div className="space-y-1 py-2">
                {filteredConversations.map((object) => {
                  const isSelected = currentConversation === object.id;
                  return (
                    <div
                      className={`flex items-center space-x-3 rounded-lg px-3 py-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                      key={object.key}
                      onClick={() => {
                        handleSelectConversation(object.id);
                        if (handleClose) {
                          handleClose();
                        }
                      }}
                    >
                      <div className="relative flex-shrink-0">
                        {object?.imgSrc ? (
                          <img
                            src={object.imgSrc}
                            alt="profile"
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold">
                            {object?.name.charAt(0)}
                          </div>
                        )}

                        {object?.status === "Online" && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800"></span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {object.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {object.message || "Start a conversation"}
                        </p>
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
