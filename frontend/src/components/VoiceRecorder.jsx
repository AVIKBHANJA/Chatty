import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAudioModal } from "../redux/slices/app";

import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { uploadToSupabase } from "../utils/supabase";
import { sendDirectMessage } from "../socket/socketConnection";
import { toast } from "react-toastify";

export default function VoiceRecorder() {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const [audioBlob, setAudioBlob] = useState(null); // State to store recorded audio blob

  const { audio } = useSelector((state) => state.app.modals);

  const { currentConversation } = useSelector((state) => state.chat);
  const [isLoading, setIsLoading] = useState(false);

  // Logged In user - ME
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!audio || keyCode !== 27) return;

      dispatch(ToggleAudioModal(false));
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  });

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.log(err)
  ); // onNotAllowed Or NotFound

  const addAudioElement = (blob) => {
    setAudioBlob(blob); // Store blob in state for sending on button click

    const url = URL.createObjectURL(blob);

    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;

    const targetContainer = document.getElementById("audio-container");
    targetContainer.appendChild(audio);
  };

  const handleSend = async () => {
    if (!audioBlob) return;

    try {
      const file = new File([audioBlob], `recording-${Date.now()}.mp3`, {
        type: "audio/mp3",
      });
      setIsLoading(true);
      const publicUrl = await uploadToSupabase(file); // Upload and get the public URL
      setIsLoading(false);

      // create data to emit socket event

      const data = {
        conversationId: currentConversation,
        message: {
          author: user._id,
          type: "Audio",
          content: "",
          audioUrl: publicUrl,
        },
      };

      // Here, you can handle sending the message
      console.log("Audio Message sent:", data);

      sendDirectMessage(data);

      // close modal window after sending message
      dispatch(dispatch(ToggleAudioModal(false)));
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
        audio ? "block" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className="md:px-17.5 w-full max-w-142.5 rounded-lg bg-white dark:bg-boxdark md:py-8 px-8 py-12"
      >
        <div className="flex flex-col space-y-8 items-center">
          <div
            id="audio-container"
            className="flex flex-col space-y-4 items-center"
          >
            <AudioRecorder
              showVisualizer={true}
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
              // downloadOnSavePress={true}
              downloadFileExtension="mp3"
            />
          </div>

          <div className="flex flex-row items-center space-x-4 w-full mt-8">
            <button
              disabled={!audioBlob}
              onClick={() => {
                if (!audioBlob) {
                  toast.error("Please record voice before sending!");
                } else {
                  handleSend();
                }
              }}
              className={`w-full rounded-lg p-2 flex flex-row items-center justify-center  ${
                !audioBlob
                  ? "cursor-not-allowed bg-gray dark:bg-boxdark-2 text-body"
                  : "bg-primary text-white hover:bg-opacity-90"
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-2 border-gray-200 border-t-primary rounded-full animate-spin"></div> // Tailwind spinner
              ) : (
                "Send"
              )}
            </button>
            <button
              disabled={isLoading}
              onClick={() => {
                dispatch(ToggleAudioModal(false));
              }}
              className="w-full border bg-transparent border-red rounded-lg p-2 text-red"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
