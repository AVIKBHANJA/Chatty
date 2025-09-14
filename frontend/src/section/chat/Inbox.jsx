import React, { useEffect, useRef, useState } from "react";
import {
  ChatTeardropSlash,
  Gif,
  Microphone,
  PaperPlaneTilt,
  List,
  User,
} from "@phosphor-icons/react";
import EmojiPicker from "../../components/EmojiPicker";
import UserInfo from "./UserInfo";
import Giphy from "../../components/Giphy";
import { useDispatch, useSelector } from "react-redux";
import { ToggleAudioModal } from "../../redux/slices/app";
import Attachment from "../../components/Attachment";
import MsgSeparator from "../../components/MsgSeparator";
import TypingIndicator from "../../components/TypingIndicator";
import {
  DocumentMessage,
  GiphyMessage,
  MediaMessage,
  TextMessage,
  VoiceMessage,
} from "../../components/Messages";
import {
  emitStartTyping,
  emitStopTyping,
  getDirectChatHistory,
  sendDirectMessage,
} from "../../socket/socketConnection";
import { format } from "date-fns";
import dateFormat, { masks } from "dateformat";
import VideoRoom from "../../components/VideoRoom";
import AudioRoom from "../../components/AudioRoom";

export default function Inbox() {
  const dispatch = useDispatch();
  const [userInfoOpen, setUserInfoOpen] = useState(false);

  const containerRef = useRef(null);

  // Logged In user - ME
  const { user } = useSelector((state) => state.user);

  const { currentConversation, conversations, typing } = useSelector(
    (state) => state.chat
  );

  const [isTyping, setIsTyping] = useState(false);

  const this_conversation = conversations.find(
    (el) => el._id?.toString() === currentConversation?.toString()
  );

  console.log(this_conversation?.messages, "this conversation messages");

  let other_user;

  if (this_conversation) {
    other_user = this_conversation.participants.find((e) => e._id !== user._id);
  }

  // Handle typing event
  useEffect(() => {
    if (isTyping) {
      // emit start-typing event

      const startTypingData = {
        userId: other_user?._id,
        conversationId: currentConversation,
      };

      emitStartTyping(startTypingData);

      const timeout = setTimeout(() => {
        // emit stop-typing event

        const stopTypingData = {
          userId: other_user?._id,
          conversationId: currentConversation,
        };

        emitStopTyping(stopTypingData);

        setIsTyping(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isTyping]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getDirectChatHistory({ conversationId: currentConversation });
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function to clear timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [currentConversation]);

  const [videoCall, setVideoCall] = useState(false);
  const [audioCall, setAudioCall] = useState(false);

  const handleToggleVideo = () => {
    setVideoCall((p) => !p);
  };
  const handleToggleAudio = () => {
    setAudioCall((p) => !p);
  };

  const [gifOpen, setGifOpen] = useState(false);

  const handleToggleGif = (e) => {
    e.preventDefault();
    setGifOpen((prev) => !prev);
  };

  const handleToggleUserInfo = () => {
    setUserInfoOpen((prev) => !prev);
  };

  const handleMicClick = (e) => {
    e.preventDefault();

    dispatch(ToggleAudioModal(true));
  };

  const thisConversation = conversations.find(
    (el) => el._id === currentConversation
  );

  const this_user = thisConversation?.participants?.find(
    (e) => e._id !== user._id
  );

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    if (!isTyping) {
      setIsTyping(true);
    }
    setInputValue(e.target.value);
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue((prev) => prev + emoji.native); // Append selected emoji to input value
  };

  function formatTime(dateString) {
    masks.hammerTime = "HH:MM";
    return dateFormat(dateString, "hammerTime");
  }

  const MSG_LIST = this_conversation?.messages
    ? this_conversation.messages.map((msg) => {
        const incoming = msg.author === user._id ? false : true;
        const authorName = incoming ? other_user?.name : user.name;
        const content = msg?.content;
        const timestamp = formatTime(msg.date);
        const type = msg?.type;
        const id = msg?._id;

        switch (msg.type) {
          case "Text":
            return {
              id,
              incoming,
              content,
              timestamp,
              authorName,
              type,
              date: msg?.date,
            };

          case "Document":
            return {
              id,
              incoming,
              content,
              timestamp,
              authorName,
              type,
              document: msg.document,
              date: msg?.date,
            };

          case "Media":
            return {
              id,
              incoming,
              content,
              timestamp,
              authorName,
              type,
              media: msg.media,
              date: msg?.date,
            };

          case "Giphy":
            return {
              id,
              incoming,
              content,
              timestamp,
              authorName,
              type,
              giphy: msg.giphyUrl,
              date: msg?.date,
            };

          case "Audio":
            return {
              id,
              incoming,
              content,
              timestamp,
              authorName,
              type,
              audioUrl: msg?.audioUrl,
              date: msg?.date,
            };

          default:
            break;
        }
      })
    : [];

  useEffect(() => {
    // Scroll to the bottom of the container on mount
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentConversation, MSG_LIST]);

  const handleSendMsg = (e) => {
    // prevent page reload
    // e.preventDefault();

    if (inputValue) {
      const data = {
        conversationId: currentConversation,
        message: {
          author: user._id,
          type: "Text",
          content: inputValue,
        },
      };

      sendDirectMessage(data);

      setInputValue("");
    }
  };

  return (
    <>
      {currentConversation ? (
        <div className="flex h-full flex-col bg-white dark:bg-gray-900 flex-1">
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-sm">
            <div
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors"
              onClick={handleToggleUserInfo}
            >
              <div className="relative">
                {this_user?.avatar ? (
                  <img
                    src={this_user?.avatar}
                    alt="avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold">
                    {this_user?.name.charAt(0)}
                  </div>
                )}
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    this_user?.status === "Online"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>

              <div className="min-w-0">
                <h5 className="font-semibold text-gray-900 dark:text-white truncate">
                  {this_user?.name}
                </h5>
                {typing?.conversationId && typing?.typing ? (
                  <p className="text-sm text-blue-500">Typing...</p>
                ) : (
                  <div
                    className={`text-sm ${
                      this_user?.status === "Online"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    {this_user?.status}
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages container */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50 dark:bg-gray-900"
          >
            {MSG_LIST.map((message, index) => {
              const isNewDay =
                index === 0 ||
                format(new Date(MSG_LIST[index - 1].date), "yyyy-MM-dd") !==
                  format(new Date(message.date), "yyyy-MM-dd");

              return (
                <React.Fragment key={message.id}>
                  {isNewDay && <MsgSeparator date={message.date} />}
                  {(() => {
                    switch (message.type) {
                      case "Text":
                        return (
                          <TextMessage
                            author={message.authorName}
                            content={message.content}
                            incoming={message.incoming}
                            timestamp={message.timestamp}
                          />
                        );

                      case "Giphy":
                        return (
                          <GiphyMessage
                            author={message.authorName}
                            content={message.content}
                            incoming={message.incoming}
                            timestamp={message.timestamp}
                            giphy={message.giphy}
                          />
                        );

                      case "Document":
                        return (
                          <DocumentMessage
                            author={message.authorName}
                            content={message.content}
                            incoming={message.incoming}
                            timestamp={message.timestamp}
                            documentFile={message.document}
                          />
                        );

                      case "Audio":
                        return (
                          <VoiceMessage
                            author={message.authorName}
                            content={message.content}
                            incoming={message.incoming}
                            timestamp={message.timestamp}
                            document={message.document}
                            audioUrl={message.audioUrl}
                          />
                        );
                      case "Media":
                        return (
                          <MediaMessage
                            incoming={message.incoming}
                            author={message.authorName}
                            timestamp={message.timestamp}
                            media={message.media}
                            caption={message.content}
                          />
                        );

                      default:
                        break;
                    }
                  })()}
                </React.Fragment>
              );
            })}

            {typing?.conversationId && typing?.typing && <TypingIndicator />}
          </div>

          {/* Input Area */}
          <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMsg(e);
                  }}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="w-full rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 pr-20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <button
                    onClick={handleMicClick}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Microphone size={16} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Attachment />
                  </button>
                  <button
                    onClick={handleToggleGif}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Gif size={16} />
                  </button>
                  <EmojiPicker onSelectEmoji={handleEmojiSelect} />
                </div>
              </div>

              <button
                onClick={handleSendMsg}
                disabled={!inputValue}
                className={`p-3 rounded-full transition-colors ${
                  inputValue
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <PaperPlaneTilt size={20} weight="bold" />
              </button>
            </div>

            {gifOpen && <Giphy />}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <ChatTeardropSlash
              size={80}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Conversation Selected
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a conversation from the sidebar to start messaging
            </p>
          </div>
        </div>
      )}

      {videoCall && (
        <VideoRoom open={videoCall} handleClose={handleToggleVideo} />
      )}

      {audioCall && (
        <AudioRoom open={audioCall} handleClose={handleToggleAudio} />
      )}

      {/* UserInfo as overlay/slide-in panel */}
      {currentConversation && userInfoOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleToggleUserInfo}
          />

          {/* UserInfo Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <UserInfo
              user={this_user}
              handleToggleUserInfo={handleToggleUserInfo}
            />
          </div>
        </>
      )}
    </>
  );
}
