import React, { useState } from "react";
import { ChatList, MessageInbox } from "../section/chat";
import { useSelector } from "react-redux";
import { List } from "@phosphor-icons/react";

import GifModal from "../components/GifModal";
import VoiceRecorder from "../components/VoiceRecorder";
import MediaPicker from "../components/MediaPicker";
import DocumentPicker from "../components/DocumentPicker";

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentConversation } = useSelector((state) => state.chat);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        {/* Mobile Chat List Toggle */}
        <div className="xl:hidden absolute top-4 left-4 z-10">
          {!currentConversation && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <List size={20} />
            </button>
          )}
        </div>

        {/* ChatList Sidebar - responsive */}
        <ChatList open={sidebarOpen} handleClose={handleCloseSidebar} />

        {/* Main Chat Area */}
        <div className="flex-1 flex min-w-0">
          <MessageInbox />
        </div>
      </div>

      {/* Modals */}
      <GifModal />
      <VoiceRecorder />
      <MediaPicker />
      <DocumentPicker />
    </>
  );
}
