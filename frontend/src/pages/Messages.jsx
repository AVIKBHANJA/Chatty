import React from "react";
import { ChatList, MessageInbox } from "../section/chat";

import GifModal from "../components/GifModal";
import VoiceRecorder from "../components/VoiceRecorder";
import MediaPicker from "../components/MediaPicker";
import DocumentPicker from "../components/DocumentPicker";

export default function Messages() {
  return (
    <>
      <div className="flex w-full h-full">
        {/* ChatList */}
        <ChatList />

        {/* Inbox */}
        <MessageInbox />
      </div>

      <GifModal />
      <VoiceRecorder />
      <MediaPicker />
      <DocumentPicker />
    </>
  );
}
